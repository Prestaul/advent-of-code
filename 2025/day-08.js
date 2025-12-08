#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input, connections = 1000) {
  const points = input.split('\n').map(l => l.split(',').map(Number));
  const dists = [];
  for (let i = 0; i < points.length; i++) {
    const [x1, y1, z1] = points[i];
    for (let j = i + 1; j < points.length; j++) {
      const [x2, y2, z2] = points[j];
      const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
      dists.push([dist, i, j]);
    }
  }
  dists.sort((a, b) => a[0] - b[0]).length = connections;

  const counts = [];
  while (dists.length) {
    const [,i, j] = dists.pop();
    const connected = new Set([i, j]);
    let found = true;
    while (found) {
      found = false;
      for (let k = dists.length - 1; k >= 0; k--) {
        const [, a, b] = dists[k];
        if (connected.has(a) || connected.has(b)) {
          connected.add(a).add(b);
          dists.splice(k, 1);
          found = true;
        }
      }
    }
    counts.push(connected.size);
  }

  return counts.sort((a, b) => a - b).slice(-3).reduce((a, b) => a * b);
}

function part2(input) {
  const points = input.split('\n').map(l => l.split(',').map(Number));
  const dists = [];
  for (let i = 0; i < points.length; i++) {
    const [x1, y1, z1] = points[i];
    for (let j = i + 1; j < points.length; j++) {
      const [x2, y2, z2] = points[j];
      const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
      dists.push([dist, i, j]);
    }
  }
  dists.sort((a, b) => a[0] - b[0]);

  const clusters = [];
  for (let k = 0; k < dists.length; k++) {
    const [, i, j] = dists[k];
    const clusterA = clusters.find(c => c.has(i));
    const clusterB = clusters.find(c => c.has(j));
    if (clusterA && clusterB && clusterA !== clusterB) {
      for (const point of clusterB) clusterA.add(point);
      clusters.splice(clusters.indexOf(clusterB), 1);
    } else if (clusterA) clusterA.add(j);
    else if (clusterB) clusterB.add(i);
    else clusters.push(new Set([i, j]));

    if (clusters.length === 1 && clusters[0].size === points.length)
      return points[i][0] * points[j][0];
  }
}

const inputFile = 'inputs/2025/day-08.txt';
const sampleInput = `
162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`.trim();

test(part1, sampleInput, 40, 10);
exec(part1, inputFile, null, 1000);

test(part2, sampleInput, 25272);
exec(part2, inputFile, 3276581616);

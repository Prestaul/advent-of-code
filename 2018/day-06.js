#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';
import { getGrid } from '../helpers/grid.js';

function part1(input) {
  const coords = input.split('\n').map(l => [l, l.split(', ').map(Number)]);

  const areas = new Map();
  getGrid({
    width: Math.max(...coords.map(([,[x,y]]) => x)) + 1,
    height: Math.max(...coords.map(([,[x,y]]) => y)) + 1,
  }).iterate((_, x, y, { w, h }) => {
    const [closest] = coords.reduce(([closest, minDist], [key, [cx, cy]]) => {
      const dist = Math.abs(cx - x) + Math.abs(cy - y);
      if (dist < minDist) return [key, dist];
      if (dist === minDist) return [null, minDist];
      return [closest, minDist];
    }, [null, Infinity]);

    if (closest !== null)
      if (x === 0 || y === 0 || x === w - 1 || y === h - 1)
        areas.set(closest, Infinity);
      else
        areas.set(closest, (areas.get(closest) ?? 0) + 1);
  });

  return Math.max(...[...areas.values()].filter(v => v !== Infinity));
}

function part2(input, limit) {
  const coords = input.split('\n').map(l => l.split(', ').map(Number));

  let count = 0;
  getGrid({
    width: Math.max(...coords.map(([x,]) => x)) + 1,
    height: Math.max(...coords.map(([,y]) => y)) + 1,
  }).iterate((_, x, y) => {
    const dist = coords.reduce((dist, [cx, cy]) => dist + Math.abs(cx - x) + Math.abs(cy - y), 0);
    if (dist < limit) count += 1;
  });
  return count;
}

const inputFile = 'inputs/2018/day-06.txt';
const sampleInput = `
1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`.trim();

test(part1, sampleInput, 17);
exec(part1, inputFile, 3251);

test(part2, sampleInput, 16, 32);
exec(part2, inputFile, 47841, 10000);

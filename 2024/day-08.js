#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  const w = input.indexOf('\n');
  const h = (input.length + 1) / (w + 1);

  const antenae = {};
  const nodes = new Set();
  const test = (x, y) => 0 <= x && x < w && 0 <= y && y < h && nodes.add(`` + [x, y]);

  for (let { 0: freq, index } of input.matchAll(/\w/sg)) {
    const [x, y] = [index % (w + 1), Math.floor(index / (w + 1))];

    for (const [ax, ay] of antenae[freq] ?? []) {
      const [dx, dy] = [ax - x, ay - y];
      test(ax + dx, ay + dy);
      test( x - dx,  y - dy);
    }

    (antenae[freq] ??= []).push([ x, y ]);
  }

  return nodes.size;
}

function part2(input) {
  const w = input.indexOf('\n');
  const h = (input.length + 1) / (w + 1);

  const antenae = {};
  const nodes = new Set();
  const test = (x, y) => 0 <= x && x < w && 0 <= y && y < h && nodes.add(`` + [x, y]);

  for (const { 0: freq, index } of input.matchAll(/\w/sg)) {
    const [x, y] = [index % (w + 1), Math.floor(index / (w + 1))];
    test(x, y);

    for (let [ax, ay] of antenae[freq] ?? []) {
      const [dx, dy] = [ax - x, ay - y];
      while (test(ax += dx, ay += dy));

      [ax, ay] = [x, y];
      while (test(ax -= dx, ay -= dy));
    }

    (antenae[freq] ??= []).push([ x, y ]);
  }

  return nodes.size;
}

const sampleInput = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`.trim();
test(part1, sampleInput, 14);
test(part2, sampleInput, 34);

const inputFile = 'inputs/2024/day-08.txt';
exec(part1, inputFile, 303);
exec(part2, inputFile, 1045);

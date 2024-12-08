#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function solve(input, isRepeating = false) {
  const w = input.indexOf('\n'), h = (input.length + 1) / (w + 1);
  const test = (x, y) => 0 <= x && x < w && 0 <= y && y < h && nodes.add(`` + [x, y]) && isRepeating;
  const antenae = {};
  const nodes = new Set();

  for (const { 0: freq, index } of input.matchAll(/\w/sg)) {
    const [x, y] = [index % (w + 1), Math.floor(index / (w + 1))];
    if (isRepeating) test(x, y);

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
test(solve, sampleInput, 14);
test(solve, sampleInput, 34, true);

const inputFile = 'inputs/2024/day-08.txt';
exec(solve, inputFile, 303);
exec(solve, inputFile, 1045, true);

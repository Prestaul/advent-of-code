#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]]

function part1(input) {
  const grid = input.split('\n').map(l => l.split('').map(Number));
  const w = grid[0].length, h = grid.length;
  let count = 0;
  const nines = new Set();

  function step(x, y, h) {
    if (grid[y]?.[x] !== h) return;
    if (h === 9) return nines.add(`` + [x, y]);

    for (let [dx, dy] of DIRS) step(x + dx, y + dy, h + 1)
  }

  for (let x = 0; x < w; x++)
    for (let y = 0; y < h; y++)
      if (grid[y][x] === 0) {
        step(x, y, 0);
        count += nines.size;
        nines.clear();
      }

  return count;
}

function part2(input) {
  const grid = input.split('\n').map(l => l.split('').map(Number));
  const w = grid[0].length, h = grid.length;
  let count = 0;

  function step(x, y, h) {
    for (let [dx, dy] of DIRS)
      if (grid[y + dy]?.[x + dx] === h)
        if (h === 9) count++;
        else step(x + dx, y + dy, h + 1);
  }

  for (let x = 0; x < w; x++)
    for (let y = 0; y < h; y++)
      if (grid[y][x] === 0) step(x, y, 1);

  return count;
}

const inputFile = 'inputs/2024/day-10.txt';
const sampleInput = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`.trim();

test(part1, sampleInput, 36);
exec(part1, inputFile, 841);

test(part2, sampleInput, 81);
exec(part2, inputFile, 1875);

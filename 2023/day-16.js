#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

const DIRS = {
  U: [ 0,-1],
  D: [ 0, 1],
  L: [-1, 0],
  R: [ 1, 0],
};

const MIRRORS = {
  U: {
    '-': ['L', 'R'],
    '\\': ['L'],
    '/': ['R'],
  },
  D: {
    '-': ['L', 'R'],
    '\\': ['R'],
    '/': ['L'],
  },
  L: {
    '|': ['U', 'D'],
    '\\': ['U'],
    '/': ['D'],
  },
  R: {
    '|': ['U', 'D'],
    '\\': ['D'],
    '/': ['U'],
  }
}

function run(grid, c, r, dir) {
  const beams = [[[c, r], dir]];

  const energized = {
    U: new Set(),
    D: new Set(),
    L: new Set(),
    R: new Set(),
  }

  let beam;
  while (beam = beams.pop()) {
    let m, add, [[x, y], d] = beam;
    while(m = grid[y]?.[x]) {
      const key = y * 1000 + x;
      if (energized[d].has(key)) break;
      energized[d].add(key);
      [d, add] = MIRRORS[d][m] ?? [d];
      if (add) beams.push([[x + DIRS[add][0], y + DIRS[add][1]], add]);
      x += DIRS[d][0];
      y += DIRS[d][1];
    }
  }

  return new Set([...energized.U, ...energized.D, ...energized.L, ...energized.R]).size;
}

function part1(input) {
  const grid = input.split('\n').map(l => l.split(''));
  return run(grid, 0, 0, 'R');
}

function part2(input) {
  const grid = input.split('\n').map(l => l.split(''));
  const h = grid.length, w = grid[0].length;
  let max = 0;

  for (let x = w; x--;)
    max = Math.max(
      max,
      run(grid, x, 0, 'D'),
      run(grid, x, h-1, 'U')
    );

  for (let y = h; y--;)
    max = Math.max(
      max,
      run(grid, 0, y, 'R'),
      run(grid, w-1, y, 'L')
    );

  return max;
}

const sampleInput = `
.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`.trim();
test(part1, sampleInput, 46);
test(part2, sampleInput, 51);

const inputFile = 'inputs/2023/day-16.txt';
exec(part1, inputFile); // => 7076
exec(part2, inputFile); // => 7324

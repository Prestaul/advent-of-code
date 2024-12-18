#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function parseGrid(input, size, bytes) {
  const grid = Array(size + 1).fill().map(() => Array(size + 1).fill(0));
  grid.blocks = input.split('\n').slice(0, bytes).map(l => l.split(',').map(Number));
  grid.blocks.forEach(([x, y]) => grid[y][x] = 1);
  return grid;
}

function part1(input, { size, bytes }) {
  const grid = Array.isArray(input) ? input : parseGrid(input, size, bytes);
  const wave = [[0,0,0]];
  for (let [x, y, d] of wave) {
    if (x === size && y === size) return d;

    if (grid[y][x] === 1 || grid[y][x] === bytes) continue;
    grid[y][x] = bytes;

    d += 1;
    if (x < size) wave.push([x+1, y, d]);
    if (x > 0) wave.push([x-1, y, d]);
    if (y < size) wave.push([x, y+1, d]);
    if (y > 0) wave.push([x, y-1, d]);
  }
}

function part2(input, { size }) {
  const grid = parseGrid(input, size, Infinity);
  const blocks = grid.blocks;

  for (let x, y; [x, y] = blocks.pop();)
    if(grid[y][x] = 0, part1(grid, { size, bytes: blocks.length }))
      return `${x},${y}`;
}

const inputFile = 'inputs/2024/day-18.txt';
const sampleInput = `
5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`.trim();

test(part1, sampleInput, 22, { size: 6, bytes: 12 });
exec(part1, inputFile, 310, { size: 70, bytes: 1024 });

test(part2, sampleInput, '6,1', { size: 6 });
exec(part2, inputFile, '16,46', { size: 70 });

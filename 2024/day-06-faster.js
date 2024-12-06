#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

const dirs = {
  '^': [0, -1,'>'],
  '>': [1, 0,'v'],
  'v': [0, 1,'<'],
  '<': [-1, 0,'^'],
}

function walk(input, grid, onTurn) {
  grid ??= input.split('\n').map(l => l.split(''));
  const s = input.indexOf('^');
  const w = grid[0].length;

  let x = s % (w + 1);
  let y = Math.floor(s / (w + 1));
  let [dx, dy, next] = dirs['^'];

  do {
    if (grid[y + dy]?.[x + dx] === '#') {
      while(grid[y + dy]?.[x + dx] === '#') [dx, dy, next] = dirs[next];
      if (onTurn?.(x, y) === false) break;
    }

    if (!onTurn) grid[y][x] = 'X';
  } while (grid[y += dy]?.[x += dx])

  return grid;
}

function part1(input) {
  return walk(input).flat().reduce((acc, c) => acc + (c === 'X'), 0);
}

function part2(input) {
  const iGrid = walk(input);
  const w = iGrid[0].length;
  const h = iGrid.length;

  let count = 0;

  for(let i = 0; i < w; i++)
    for(let j = 0; j < h; j++)
      if (iGrid[j][i] === 'X') {
        const grid = input.split('\n').map(l => l.split(''));

        grid[j][i] = '#';

        walk(input, grid, (x, y) => {
          if (grid[y][x] === '+' && ++count) return false;
          grid[y][x] = '+';
        });
      }

  return count;
}

const sampleInput = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`.trim();
test(part1, sampleInput, 41);
test(part2, sampleInput, 6);

const inputFile = 'inputs/2024/day-06.txt';
exec(part1, inputFile, 4789);
exec(part2, inputFile, 1304);

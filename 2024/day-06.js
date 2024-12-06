#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

const dirs = {
  '^': [0, -1,'>'],
  '>': [1, 0,'v'],
  'v': [0, 1,'<'],
  '<': [-1, 0,'^'],
}

function part1(input) {
  const s = input.indexOf('^');
  const w = input.indexOf('\n');
  const h = input.split('\n').length;

  const grid = input.split('\n').map(l => l.split(''));

  let x = s % (w + 1);
  let y = Math.floor(s / (w + 1));
  let [dx, dy, next] = dirs['^'];
  while (x >= 0 && y >= 0 && x < w && y < h) {
    grid[y][x] = 'X';

    while (grid[y + dy]?.[x + dx] === '#')
      [dx, dy, next] = dirs[next];

    x += dx;
    y += dy;
  }

  return grid.map(l => l.join('')).join('\n').replaceAll(/[^X]+/gs, '').length;
}

function part2(input) {
  const s = input.indexOf('^');
  const w = input.indexOf('\n');
  const h = input.split('\n').length;

  let count = 0;

  for(let i = 0; i < w; i++) {
    for(let j = 0; j < h; j++) {
      const grid = input.split('\n').map(l => l.split(''));
      if (grid[j][i] === '.') grid[j][i] = '#';
      else continue;

      let x = s % (w + 1);
      let y = Math.floor(s / (w + 1));
      let [dx, dy, next] = dirs['^'];
      while (x >= 0 && y >= 0 && x < w && y < h) {
        if (grid[y + dy]?.[x + dx] === '#') {
          if (grid[y][x] === '+') {
            count++;
            break;
          }
          grid[y][x] = '+';
          while(grid[y + dy]?.[x + dx] === '#')
            [dx, dy, next] = dirs[next];
        } else {
          grid[y][x] = 'X';
        }

        x += dx;
        y += dy;
      }
    }
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

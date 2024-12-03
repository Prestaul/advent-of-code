#!/usr/bin/env node
import { exec } from '../helpers/exec.js';
import { iterate } from '../helpers/iterate.js';

function cycle(grid, w, h) {
  //N
  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (grid[r][c] !== 'O') continue;

      let j = r;
      while(j && grid[j - 1][c] === '.') j--;
      if (j < r) {
        grid[j][c] = 'O';
        grid[r][c] = '.';
      }
    }
  }
  // console.log('N');
  // console.log(grid.map(s => s.join('')).join('\n'));

  // W
  for (let c = 0; c < w; c++) {
    for (let r = 0; r < h; r++) {
      if (grid[r][c] !== 'O') continue;

      let j = c;
      while(j && grid[r][j - 1] === '.') j--;
      if (j < c) {
        grid[r][j] = 'O';
        grid[r][c] = '.';
      }
    }
  }
  // console.log('W');
  // console.log(grid.map(s => s.join('')).join('\n'));

  // S
  for (let r = h - 1; r >= 0; r--) {
    for (let c = 0; c < w; c++) {
      if (grid[r][c] !== 'O') continue;

      let j = r;
      while(j + 1 < h && grid[j + 1][c] === '.') j++;
      if (j > r) {
        grid[j][c] = 'O';
        grid[r][c] = '.';
      }
    }
  }
  // console.log('S');
  // console.log(grid.map(s => s.join('')).join('\n'));

  // E
  for (let c = w; c >= 0; c--) {
    for (let r = 0; r < h; r++) {
      if (grid[r][c] !== 'O') continue;

      let j = c;
      while(j + 1 < w && grid[r][j + 1] === '.') j++;
      if (j > c) {
        grid[r][j] = 'O';
        grid[r][c] = '.';
      }
    }
  }
  // console.log('E');
  // console.log(grid.map(s => s.join('')).join('\n'));
  return grid;
}

function main(input) {
  const grid =  input.split('\n').map(l => l.split(''));
  const h = grid.length;
  const w = grid[0].length;

  iterate({
    initialValue: grid,
    args: [w, h],
    computeNext: cycle,
    limit: 1000000000,
    getKey: v => v.flat().join(''),
    // debug: (v, i) => console.log(v.map(r => r.join('')).join('\n')),
  });

  return grid.map((r, i) => r.filter(c => c === 'O').length * (grid.length - i)).reduce((a, b) => a + b)
}

exec(main, '2023/day-14-input.txt'); // 85175

console.log(main(`O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`)); // 64

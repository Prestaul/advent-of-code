#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function main(input) {
  const grid =  input.split('\n').map(l => l.split(''));
  const h = grid.length;
  const w = grid[0].length;

  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (grid[r][c] !== 'O') continue;

      let j = r;
      while(j && grid[j-1][c] === '.') j--;
      if (j < r) {
        grid[j][c] = 'O';
        grid[r][c] = '.';
      }
    }
  }
  return grid.map((r, i) => r.filter(c => c === 'O').length * (grid.length - i)).reduce((a, b) => a + b)
  grid.map(s => s.join('')).join('\n');
}

exec(main, 'inputs/2023/day-14.txt'); // 105982

console.log(main(`O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`)); // 136

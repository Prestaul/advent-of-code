#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function main(input) {
  return input.split('\n\n').map(valley => {
    const lines = valley.split('\n');
    const len = lines[0].length;
    colsOuter: for (let c = 1; c < len; c++) {
      for (let r of lines) {
        for (let i = 0; i < c && c + i < len; i++) {
          // console.log(c, i, c - i - 1, c + i, r[c - i - 1], r[c + i])
          if (c + i < len && r[c - i - 1] !== r[c + i]) continue colsOuter;
        }
      }
      return c;
    }

    rowsOuter: for (let r = 1; r < lines.length; r++) {
      for (let c = 0; c < len; c++) {
        for (let i = 0; i < r && r + i < lines.length; i++) {
          // console.log(r, i, c - i - 1, c + i, r[c - i - 1], r[c + i])
          if (r + i < lines.length && lines[r - i - 1][c] !== lines[r + i][c]) continue rowsOuter;
        }
      }
      return r * 100;
    }
  }).reduce((a, b) => a + b);
}

exec(main, 'inputs/2023/day-13.txt', 32723);

console.log(main(`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`)); // 405

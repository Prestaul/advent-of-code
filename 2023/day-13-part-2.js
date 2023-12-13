#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function main(input) {
  return input.split('\n\n').map(valley => {
    const lines = valley.split('\n');
    const len = lines[0].length;
    for (let c = 1; c < len; c++) {
      let diffs = 0;
      for (let r of lines) {
        for (let i = 0; i < c && c + i < len; i++) {
          if (c + i < len && r[c - i - 1] !== r[c + i]) diffs++;
        }
      }
      if (diffs === 1) return c;
    }

    for (let r = 1; r < lines.length; r++) {
      let diffs = 0;
      for (let c = 0; c < len; c++) {
        for (let i = 0; i < r && r + i < lines.length; i++) {
          if (r + i < lines.length && lines[r - i - 1][c] !== lines[r + i][c]) diffs++;
        }
      }
      if (diffs === 1) return r * 100;
    }
  }).reduce((a, b) => a + b);
}

exec(main, '2023/day-13-input'); // 34536

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
#....#..#`)); // 400

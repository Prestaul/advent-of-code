#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function getMatches(r, input, w) {
  const out = [];
  let s;
  while(s = r.exec(input)) {
    out.push({
      val: s[0],
      row: Math.floor(s.index / w),
      col: s.index % w,
      len: s[0].length,
    });
  }
  return out;
}

function main(input) {
  const numbers = getMatches(/\d+/g, input, input.indexOf('\n') + 1);
  const symbols = getMatches(/[^\d\s.]/g, input, input.indexOf('\n') + 1);

  return numbers.filter(
      ({ row, col, len }) => symbols.some(({ row: r, col: c }) => Math.abs(row - r) <= 1 && (c >= col - 1 && c <= col + len))
    ).reduce((sum, n) => sum + Number(n.val), 0);
}

// ORIGINAL SOLUTION THAT I HATED
// function main(input) {
//   const grid = input.split('\n').map(s => `.${s}.`.split(''));
//   const h = grid.length + 1;
//   const w = grid[0].length + 1;
//   const g = [new Array(w).fill('.'), ...grid, new Array(w).fill('.')];

//   let sum = 0;
//   let n = '';
//   let isPart = false;
//   for(let i = 1; i < h; i++) for(let j = 1; j < w; j++) {
//     if (isNaN(g[i][j])) continue;

//     do {
//       n += g[i][j];
//       isPart ||= (g[i-1][j-1] !== '.'
//         || g[i-1][j] !== '.'
//         || g[i-1][j+1] !== '.'
//         || (g[i][j-1] !== '.' && isNaN(g[i][j-1]))
//         || (g[i][j+1] !== '.' && isNaN(g[i][j+1]))
//         || g[i+1][j-1] !== '.'
//         || g[i+1][j] !== '.'
//         || g[i+1][j+1] !== '.'
//       )
//     } while(!isNaN(g[i][++j]))

//     if(isPart) {
//         sum += Number(n);
//     }

//     n = '';
//     isPart = false;
//   }

//   return sum;
// }

exec(main, '2023/day-3-input');

// console.log(main(`467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`));

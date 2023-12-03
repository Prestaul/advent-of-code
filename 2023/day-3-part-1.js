#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function main(input) {
  const grid = input.split('\n').map(s => `.${s}.`.split(''));
  const h = grid.length + 1;
  const w = grid[0].length + 1;
  const g = [new Array(w).fill('.'), ...grid, new Array(w).fill('.')];

  let sum = 0;
  let n = '';
  let isPart = false;
  for(let i = 1; i < h; i++) for(let j = 1; j < w; j++) {
    if (isNaN(g[i][j])) continue;

    do {
      n += g[i][j];
      isPart ||= (g[i-1][j-1] !== '.'
        || g[i-1][j] !== '.'
        || g[i-1][j+1] !== '.'
        || (g[i][j-1] !== '.' && isNaN(g[i][j-1]))
        || (g[i][j+1] !== '.' && isNaN(g[i][j+1]))
        || g[i+1][j-1] !== '.'
        || g[i+1][j] !== '.'
        || g[i+1][j+1] !== '.'
      )
    } while(!isNaN(g[i][++j]))

    if(isPart) {
        sum += Number(n);
    }

    n = '';
    isPart = false;
  }

  return sum;
}

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

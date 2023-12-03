#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function main(input) {
  const lines = input.split('\n');
  const grid = lines.map(s => `.${s}.`.split(''));
  const h = grid.length + 1;
  const w = grid[0].length + 1;
  const g = [new Array(w).fill('.'), ...grid, new Array(w).fill('.')];

  function getNumContaining(i, j) {
    if (isNaN(g[i][j])) return null;

    const r = /\d+/g;
    r.lastIndex = lines[i - 1].lastIndexOf('.', j - 1);
    nums.push(r.exec(lines[i - 1])[0]);
  }

  function getNumAfter(i, j) {
    if (isNaN(g[i][j])) return null;

    const r = /\d+/g;
    r.lastIndex = j - 1;
    nums.push(r.exec(lines[i - 1])[0]);
  }

  let sum = 0;
  let nums = [];
  for(let i = 1; i < h; i++) for(let j = 1; j < w; j++) {
    if (g[i][j] !== '*') continue;

    getNumContaining(i, j - 1),
    getNumAfter(i, j + 1)
    if (g[i-1][j] === '.') {
      getNumContaining(i - 1, j - 1);
      getNumAfter(i - 1, j + 1);
    } else {
      getNumContaining(i - 1, j);
    }
    if (g[i + 1][j] === '.') {
      console.log('A')
      getNumContaining(i + 1, j - 1);
      getNumAfter(i + 1, j + 1);
    } else {
      console.log('B', i+1, j)
      getNumContaining(i + 1, j);
    }

    nums = nums.map(Number).filter(n => !isNaN(n));

    if (nums.length === 2) {
      sum += nums[0] * nums[1];
    }

    nums.length = 0;
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
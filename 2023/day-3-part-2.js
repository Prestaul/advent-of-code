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
  const symbols = getMatches(/\*/g, input, input.indexOf('\n') + 1);

  return symbols
    .map(({ row: r, col: c }) => numbers.filter(({ row, col, len }) => Math.abs(row - r) <= 1 && (c >= col - 1 && c <= col + len)))
    .map(nums => nums.length === 2 ? Number(nums[0].val) * Number(nums[1].val) : 0)
    .reduce((sum, n) => sum + n, 0);
}

function firstSolution(input) {
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

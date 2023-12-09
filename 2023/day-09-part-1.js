#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function next(diffs, n, i, a) {
  if (i + 1 < a.length) {
    diffs.push(a[i + 1] - n);
    return diffs;
  }
  if (a.every(v => !v)) return 0;
  return n + diffs.reduce(next, []);
}

function main(input) {
  return input.split('\n').map(l => l.match(/-?\d+/g).map(Number).reduce(next, [])).reduce((a, b) => a + b);
}

exec(main, '2023/day-09-input'); // 1702218515

console.log(main(`0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`)); // 114

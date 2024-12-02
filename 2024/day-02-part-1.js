#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function isSafe(levels) {
  const isIncreasing = levels[0] > levels[1];
  let i = levels.length;
  while(i--) {
    const a = levels[i], b = levels[i - 1];
    if (isIncreasing ? a >= b || b - a > 3 : a <= b || a - b > 3)
      return false;
  }
  return true;
}

function main(input) {
  return input.trim()
    .split('\n')
    .map(line => line.split(' ').map(Number))
    .filter(isSafe).length;
}

const sampleInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

test(main, sampleInput, 2);
exec(main, '2024/day-02-input');

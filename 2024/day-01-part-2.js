#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function main(input) {
  const lines = input.split('\n');
  const arrA = [], arrB = [];

  for (const line of lines) {
    const [a, b] = line.split('   ').map(Number);
    arrA.push(a);
    arrB.push(b);
  }

  return arrA.reduce((sum, a, i) =>
    sum + a * arrB.filter(b => b === a).length
  , 0);
}

const sampleInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

test(main, sampleInput, 31);
exec(main, '2024/day-01-input.txt');

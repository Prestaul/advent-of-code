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

  arrA.sort();
  arrB.sort();

  return arrA.reduce((sum, a, i) => sum + Math.abs(a - arrB[i]), 0);
}

const sampleInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

test(main, sampleInput, 11);
exec(main, 'inputs/2024/day-01.txt'); // 1722302

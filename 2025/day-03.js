#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function solution(input, len) {
  const lines = input.split('\n');
  let result = 0;

  for (const line of lines) {
    let nums = line.split('').map(Number);
    const digits = [];

    for (let i = 1 - len; i <= 0; i++) {
      const d = Math.max(...nums.slice(0, i || undefined));
      const idx = nums.indexOf(d);
      nums = nums.slice(idx + 1);
      digits.push(d);
    }

    result += Number(digits.join(''));
  }

  return result
}

const inputFile = 'inputs/2025/day-03.txt';
const sampleInput = `
987654321111111
811111111111119
234234234234278
818181911112111`.trim();

test(solution, sampleInput, 357, 2);
exec(solution, inputFile, 17092, 2);

test(solution, sampleInput, 3121910778619, 12);
exec(solution, inputFile, 170147128753455, 12);

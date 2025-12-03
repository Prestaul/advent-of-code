#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function julze(nums, len, result) {
  const d = Math.max(...nums.slice(0, (1 - len) || undefined));
  const idx = nums.indexOf(d);
  result = result * 10 + d;
  return len === 1 ? result : julze(nums.slice(idx + 1), len - 1, result);
}

function solve(input, len) {
  let result = 0;
  for (const line of input.split('\n')) result += julze(line.split('').map(Number), len, 0);
  return result
}

// function firstWorkingSolution(input, len) {
//   const lines = input.split('\n');
//   let result = 0;

//   for (const line of lines) {
//     let nums = line.split('').map(Number);
//     const digits = [];

//     for (let i = 1 - len; i <= 0; i++) {
//       const d = Math.max(...nums.slice(0, i || undefined));
//       const idx = nums.indexOf(d);
//       nums = nums.slice(idx + 1);
//       digits.push(d);
//     }

//     result += Number(digits.join(''));
//   }

//   return result
// }

const inputFile = 'inputs/2025/day-03.txt';
const sampleInput = `
987654321111111
811111111111119
234234234234278
818181911112111`.trim();

test(solve, sampleInput, 357, 2);
exec(solve, inputFile, 17092, 2);

test(solve, sampleInput, 3121910778619, 12);
exec(solve, inputFile, 170147128753455, 12);

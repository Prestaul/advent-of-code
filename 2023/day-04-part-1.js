#!/usr/bin/env node
import { exec } from '../helpers/exec.js';
import { splitAtLength } from '../helpers/strings.js';

function main(input) {
  let sum = 0;
  input.split('\n').forEach(s => {
    const [a, b] = s.split(':')[1].split(' |').map(splitAtLength(3));
    const w = a.filter(s => b.includes(s)).length;
    if (w) sum += Math.pow(2, w - 1);
  });
  return sum;
}

exec(main, 'inputs/2023/day-04.txt'); // 26426

console.log(main(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`)); // 13

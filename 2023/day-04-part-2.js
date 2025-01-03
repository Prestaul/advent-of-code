#!/usr/bin/env node
import { exec } from '../helpers/exec.js';
import { splitAtLength } from '../helpers/strings.js';

function main(input) {
  const cards = input.split('\n');
  const copies = new Array(cards.length).fill(1);
  cards.forEach((s, c) => {
    const [a, b] = s.split(':')[1].split(' |').map(splitAtLength(3));
    let w = a.filter(s => b.includes(s)).length;
    while(w) copies[c + w--] += copies[c];
  });
  return copies.reduce((sum, n) => sum + n);
}

exec(main, 'inputs/2023/day-04.txt', 6227972);

console.log(main(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`)); // 30

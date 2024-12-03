#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  const [twos, threes] = input.split('\n').map(s => {
    const chars = {};
    for (let c of s) chars[c] = (chars[c] ?? 0) + 1;
    const counts = new Set(Object.values(chars));
    return [counts.has(2), counts.has(3)];
  })
  .reduce((a, b) => [a[0] + b[0], a[1] + b[1]]);
  return twos * threes;
}

function offByOne(a, b) {
  let i = -1;
  while (++i < a.length) if (a[i] !== b[i]) break;

  let j = a.length;
  while (j--) if (a[j] !== b[j]) break;

  if (i === j) return a.substring(0, i) + a.substring(i + 1);
}

function part2(input) {
  const words = input.split('\n');

  let i = words.length;
  while(i--) {
    let j = i;
    while(j--) {
      const match = offByOne(words[i], words[j]);
      if (match) return match;
    }
  }
}

test(part1, `abcdef
bababc
abbcde
abcccd
aabcdd
abcdee
ababab`, 12);
test(part2, `abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz`, 'fgij');

const inputFile = 'inputs/2018/day-02.txt'
exec(part1, inputFile); // => 7533
exec(part2, inputFile); // => mphcuasvrnjzzkbgdtqeoylva

#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function main(input) {
  const [l1, l2] = input.trim().split('\n');
  const [time] = l1.replaceAll(/\s+/g, '').match(/\d+/g).map(Number);
  const [dist] = l2.replaceAll(/\s+/g, '').match(/\d+/g).map(Number);

  let wins = 0;
  for (let t = 1; t < time; t++) {
    if (t * (time - t) > dist) wins += 1;
  }

  return wins;
}

console.time();
console.log(main(`Time:        51     92     68     90
Distance:   222   2031   1126   1225`));
// console.log(main(`Time:      7  15   30
// Distance:  9  40  200`));
console.timeEnd();

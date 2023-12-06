#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function main(input) {
  const [l1, l2] = input.trim().split('\n');
  const times = l1.match(/\d+/g).map(Number);
  const distances = l2.match(/\d+/g).map(Number);

  return times.map((time, i) => {
    let wins = 0;
    const dist = distances[i];
    for (let t = 1; t < time; t++) {
      if (t * (time - t) > dist) wins += 1;
    }

    return wins;
  }).reduce((m, n) => m * n);
}

console.log(main(`Time:        51     92     68     90
Distance:   222   2031   1126   1225`));
// console.log(main(`Time:      7  15   30
// Distance:  9  40  200`));

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

exec(main, 'inputs/2023/day-06.txt', 500346);

console.log(main(`Time:      7  15   30
Distance:  9  40  200`)); // 288

#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function main(input) {
  return input.split('\n').filter(g => {
    return g.match(/\d+(?= r)/g).every(n => Number(n) <= 12)
      && g.match(/\d+(?= g)/g).every(n => Number(n) <= 13)
      && g.match(/\d+(?= b)/g).every(n => Number(n) <= 14);
  }).map(g => g.match(/\d+/)[0]).reduce((sum, n) => sum + Number(n), 0);
}

exec(main, '2023/day-2-input');

// console.log(main(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`));

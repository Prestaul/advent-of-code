#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function main(input) {
  return input.split('\n').map(g =>
     Math.max(...g.match(/\d+(?= r)/g).map(n => Number(n)))
      * Math.max(...g.match(/\d+(?= g)/g).map(n => Number(n)))
      * Math.max(...g.match(/\d+(?= b)/g).map(n => Number(n)))
  ).reduce((sum, n) => sum + n, 0);
}

exec(main, 'inputs/2023/day-02.txt'); // 72227

console.log(main(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`)); // 2286

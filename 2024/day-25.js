#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function cols(cylinder) {
  const pins = [0, 0, 0, 0, 0];

  for (const l of cylinder.split('\n').slice(1, -1))
    for (let col = 0; col < 5; col++)
      if (l[col] === '#') pins[col] += 1;

  return pins;
}

function part1(input) {
  const locks = input.split('\n\n').filter(([c]) => c === '#').map(cols);
  const keys = input.split('\n\n').filter(([c]) => c === '.').map(cols);

  let count = 0;
  for (const lock of locks)
    for (const key of keys)
      if (lock.every((pin, i) => pin + key[i] < 6)) count += 1;

  return count;
}

const inputFile = 'inputs/2024/day-25.txt';
const sampleInput = `
#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`.trim();

test(part1, sampleInput, 3);
exec(part1, inputFile);

#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function solve(input) {
  const parts = input.split('\n\n');
  const problems = parts.pop().split('\n');
  const pieces = parts.map(p => p.split('').filter(c => c === '#').length);

  return problems.filter(l => {
    const [w, h, ...counts] = l.split(/\D+/g).map(Number);
    return counts.reduce((area, c, i) => area + pieces[i] * c, 0) <= w * h;
  }).length;
}

const inputFile = 'inputs/2025/day-12.txt';
const sampleInput = `
0:
###
..#
###

1:
..#
.##
##.

2:
##.
###
#.#

3:
###
.##
..#

4:
#.#
###
#.#

5:
..#
###
###

35x35: 19 19 20 28 21 14
35x35: 32 35 25 32 30 36
35x35: 33 32 27 31 34 32`.trim();
// const sampleInput = `
// 0:
// ###
// ##.
// ##.

// 1:
// ###
// ##.
// .##

// 2:
// .##
// ###
// ##.

// 3:
// ##.
// ###
// ##.

// 4:
// ###
// #..
// ###

// 5:
// ###
// .#.
// ###

// 4x4: 0 0 0 0 2 0
// 12x5: 1 0 1 0 2 2
// 12x5: 1 0 1 0 3 2`.trim();

test(solve, sampleInput, 1);
exec(solve, inputFile);

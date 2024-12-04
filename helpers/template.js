#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  return input.split('\n').map(l => l.split('').map(Number)).flat().reduce((a, b) => a + b);
}

function part2(input) {
  return input.split('\n').map(Number).reduce((a, b) => a + b);
}

const sampleInput = `
123`.trim();
test(part1, sampleInput, 6);
// test(part2, sampleInput, 123);

const inputFile = '2024/day-DD-input.txt';
// exec(part1, inputFile);
// exec(part2, inputFile);

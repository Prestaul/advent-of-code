#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  return input.split('\n').map(l => l.split('').map(Number)).flat().reduce((a, b) => a + b);
}

function part2(input) {
  return input.split('\n').map(Number).reduce((a, b) => a + b);
}

const inputFile = 'inputs/2025/day-DD.txt';
const sampleInput = `
123`.trim();

test(part1, sampleInput, 6);
// exec(part1, inputFile);

// test(part2, sampleInput, 123);
// exec(part2, inputFile);

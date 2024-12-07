#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  return input.replaceAll(':', '').split('\n').reduce((sum, line) => {
    const [testVal, ...terms] = line.split(' ').map(Number);

    let x = 2 ** (terms.length - 1);
    while (x--)
      if (terms.reduce((total, term, i) => x & (1 << (i-1)) ? total + term : total * term) === testVal)
        return testVal + sum;

    return sum;
  }, 0);
}

function part2(input) {
  return input.replaceAll(':', '').split('\n').reduce((sum, line) => {
    const [testVal, ...terms] = line.split(' ').map(Number);

    let x = 3 ** (terms.length - 1);
    while (x--)
      if (terms.reduce((total, term, i) => {
        const op = (x / 3 ** (i - 1) | 0) % 3;
        return op === 0 ? total + term : op === 1 ? total * term : Number(``+total+term);
      }) === testVal)
        return testVal + sum;

    return sum;
  }, 0);
}

const sampleInput = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`.trim();
test(part1, sampleInput, 3749);
test(part2, sampleInput, 11387);

const inputFile = 'inputs/2024/day-07.txt';
exec(part1, inputFile, 3351424677624);
exec(part2, inputFile, 204976636995111);

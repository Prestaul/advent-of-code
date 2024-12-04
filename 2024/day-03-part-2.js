#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function main(input) {
  return Array.from(input.replaceAll(/don't\(\).*?do\(\)/gs, '').matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g))
    .reduce((sum, [, a, b]) => sum + a * b, 0);
}

const sampleInput = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

test(main, sampleInput, 48);
exec(main, 'inputs/2024/day-03.txt', 82868252);

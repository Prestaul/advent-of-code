#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function main(input) {
  return Array.from(input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g))
    .reduce((sum, [, a, b]) => sum + a * b, 0);
}

const sampleInput = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

test(main, sampleInput, 161);
exec(main, 'inputs/2024/day-03.txt', 170778545);

#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

// Part 1 just evals the input...

function part2(input) {
  const nums = input.replaceAll('+', '').split('\n').map(Number);
  const prev = new Set();
  let val = 0;

  while(true) for(let n of nums) {
    prev.add(val);
    if (prev.has(val += n)) return val;
  }
}

const sampleInput = `+3
+3
+4
-2
-4`;
test(eval, sampleInput, 4);
test(part2, sampleInput, 10);

const inputFile = 'inputs/2018/day-01.txt'
exec(eval, inputFile); // => 540
exec(part2, inputFile); // => 73056

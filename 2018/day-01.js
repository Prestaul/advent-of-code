#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function main(input) {
  const nums = input.replaceAll('+', '').split('\n').map(Number);
  const prev = new Set();
  let val = 0;

  while(true) for(let n of nums) {
    prev.add(val);
    if (prev.has(val += n)) return val;
  }
}

// Part 1 just evals the input...
exec(eval, '2018/day-01-input'); // 540

// Part 2
exec(main, '2018/day-01-input'); // 73056

console.log(main(`+3
+3
+4
-2
-4`)); // 10

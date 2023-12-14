#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function main(input) {
  return input
    .replaceAll(/[^0-9\n]/g, '')
    .split('\n')
    .reduce((sum, s) => sum + Number(s[0] + s.at(-1)), 0);
}

exec(main, '2023/day-01-input'); // 55208

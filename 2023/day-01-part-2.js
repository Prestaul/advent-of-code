#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

const NUMS = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9'
};

function main(input) {
  return input.split('\n')
    .map(s => s.replaceAll(/one|two|three|four|five|six|seven|eight|nine/g, d => d[0] + NUMS[d] + d.at(-1))
               .replaceAll(/one|two|eight/g, d => NUMS[d])
               .replaceAll(/\D/g, '')
    )
    .reduce((sum, s) => sum + Number(s[0] + s.at(-1)), 0);
}

exec(main, '2023/day-01-input'); // 54578

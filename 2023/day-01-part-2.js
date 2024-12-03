#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

const NUMS = { n:'1', w:'2', hre:'3', ou:'4', iv:'5', i:'6', eve:'7', igh:'8', in:'9' };
function main(input) {
  return input
    .replaceAll(/(?<=o)n(?=e)|(?<=t)w(?=o)|(?<=t)hre(?=e)|(?<=f)ou(?=r)|(?<=f)iv(?=e)|(?<=s)i(?=x)|(?<=s)eve(?=n)|(?<=e)igh(?=t)|(?<=n)in(?=e)/g, d => NUMS[d])
    .replaceAll(/[^0-9\n]/g, '')
    .split('\n')
    .reduce((sum, s) => sum + Number(s[0] + s.at(-1)), 0);
}

// const NUMS = { one:'1', two:'2', three:'3', four:'4', five:'5', six:'6', seven:'7', eight:'8', nine:'9' };
// function main(input) {
//   return input
//     .replaceAll(/one|two|three|four|five|six|seven|eight|nine/g, d => d[0] + NUMS[d] + d.at(-1))
//     .replaceAll(/one|two|eight/g, d => NUMS[d])
//     .replaceAll(/[^0-9\n]/g, '')
//     .split('\n')
//     .reduce((sum, s) => sum + Number(s[0] + s.at(-1)), 0);
// }

exec(main, 'inputs/2023/day-01.txt'); // 54578

console.log(main(`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`)); // => 281

#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

// Biggest number is 9899037441, which is 10 digits

const SPLIT1 = /\d{1}/g,
  SPLIT2 = /\d{2}/g,
  SPLIT3 = /\d{3}/g,
  SPLIT4 = /\d{4}/g,
  SPLIT5 = /\d{5}/g,
  SPLITS = {
    2: [SPLIT1],
    3: [SPLIT1],
    4: [SPLIT2],
    5: [SPLIT1],
    6: [SPLIT3, SPLIT2],
    7: [SPLIT1],
    8: [SPLIT4, SPLIT2],
    9: [SPLIT3],
    10: [SPLIT5, SPLIT2],
  };

function isValidPart2(n) {
  const str = String(n);
  for (const split of SPLITS[str.length] ?? [])
    if (str.match(split).every((s, _, [s0]) => s === s0)) return false;
  return true;
}

function isValidPart1(n) {
  const str = String(n);
  const i = str.length / 2;
  return str.slice(0, i) !== str.slice(i);

  // First solution:
  // const halfMag = (Math.floor(Math.log10(n)) + 1) / 2;
  // if (!Number.isInteger(halfMag)) return true;
  // const left = Math.floor(n / 10 ** halfMag);
  // const right = n % 10 ** halfMag;
  // return left !== right;
}

function solution(input, isValid) {
  const ranges = input.split(',').map((r) => r.split('-').map(Number));
  let result = 0;

  for (const [min, max] of ranges)
    for (let n = min; n <= max; n++)
      if (!isValid(n)) result += n;

  return result;
}

const inputFile = 'inputs/2025/day-02.txt';
const sampleInput = `
11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124
`.trim();

test(solution, sampleInput, 1227775554, isValidPart1);
exec(solution, inputFile, 55916882972, isValidPart1);

test(solution, sampleInput, 4174379265, isValidPart2);
exec(solution, inputFile, 76169125915, isValidPart2);

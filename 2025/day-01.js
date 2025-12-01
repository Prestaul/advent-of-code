#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  let p = 50;

  return input.split('\n').reduce((c, s) => {
    const dir = s[0];
    const steps = Number(s.substr(1));
    const before = p;
    if (dir === 'R') p = (p + steps) % 100;
    if (dir === 'L') p = (100 + (p - 100 - steps) % 100) % 100;
    // console.log(`${s} ~ ${before} => ${p}`);
    return p ? c : c + 1;
  }, 0);
}

function part2(input) {
  let p = 50;

  return input.split('\n').reduce((c, s) => {
    const dir = s[0];
    let steps = Number(s.substr(1));
    const before = p;

    if (dir === 'L') p = p && (100 - p);

    p += steps;

    while (p >= 100) {
      p -= 100;
      c++;
    }

    p = p % 100;

    if (dir === 'L') p = (100 - p) % 100;

    // console.log(`${s} ~ ${before} => ${p} (c: ${c})`);

    return c;
  }, 0);
}

const inputFile = 'inputs/2025/day-01.txt';
const sampleInput = `
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`.trim();

test(part1, sampleInput, 3);
exec(part1, inputFile);

test(part2, sampleInput, 6);
exec(part2, inputFile);

#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function react(chars, drop) {
  if (drop) chars = chars.filter(c => c !== drop && c !== drop + 32);
  let prev;
  do {
    prev = chars.length;
    for (let i = 0, j = 1; j < chars.length; i = j, j = i + 1) {
      while(chars[i] && chars[j] && Math.abs(chars[i] - chars[j]) === 32) {
        chars[i--] = null;
        chars[j++] = null;
        if (i < 0 || j >= chars.length) break;
      }
    }
    chars = chars.filter(Boolean);
  } while (prev !== chars.length);

  return chars;
}

function part1(input) {
  return react(Array.from(input, c => c.charCodeAt(0))).length;
}

function part2(input) {
  const chars = react(Array.from(input, c => c.charCodeAt(0)));
  return Array.from({ length: 26 }, (_, i) => i + 65).reduce((best, c) => Math.min(react(chars, c).length, best), chars.length);
}

const inputFile = 'inputs/2018/day-05.txt';
const sampleInput = `
dabAcCaCBAcCcaDA`.trim();

test(part1, sampleInput, 10);
exec(part1, inputFile, 10450);

test(part2, sampleInput, 4);
exec(part2, inputFile, 4624);

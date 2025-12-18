#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  let i = 0;
  const instr = input.split(' ').map(Number),
        pop = () => instr[i++];

  return (function nextChild() {
    let c = pop(), m = pop(), checksum = 0;
    while(c--) checksum += nextChild();
    while(m--) checksum += pop();
    return checksum;
  })();
}

function part2(input) {
  let i = 0;
  const instr = input.split(' ').map(Number),
        pop = () => instr[i++];

  return (function nodeValue() {
    let c = pop(), m = pop(), value = 0;
    const children = Array.from({ length: c }, nodeValue);
    if (c)
      while(m--) value += children[pop() - 1] ?? 0;
    else
      while(m--) value += pop();
    return value;
  })();
}

const inputFile = 'inputs/2018/day-08.txt';
const sampleInput = `
2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`.trim();

test(part1, sampleInput, 138);
exec(part1, inputFile, 42768);

test(part2, sampleInput, 66);
exec(part2, inputFile, 34348);

#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  let [prevLine, ...lines] = input.replace("S", "|").split('\n');
  let splits = 0;
  for (const line of lines) {
    let nextLine = prevLine;
    for (const { index: x } of line.matchAll(/\^/g))
      if (prevLine[x] === '|') {
        nextLine = nextLine.slice(0, x - 1) + '|.|' + nextLine.slice(x + 2);
        splits += 1;
      }
    prevLine = nextLine;
  }
  return splits;
}

function part2(input) {
  let [prevLine, ...lines] = input.replace("S", "|").split('\n');
  const paths = prevLine.split('').map(c => c === '|' ? 1 : 0);
  for (const line of lines) {
    let nextLine = prevLine;
    for (const { index: x } of line.matchAll(/\^/g))
      if (prevLine[x] === '|') {
        nextLine = nextLine.slice(0, x - 1) + '|.|' + nextLine.slice(x + 2);
        paths[x - 1] += paths[x];
        paths[x + 1] += paths[x];
        paths[x] = 0;
      }
    prevLine = nextLine;
  }
  return paths.reduce((a, b) => a + b, 0);
}

const inputFile = 'inputs/2025/day-07.txt';
const sampleInput = `
.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`.trim();

test(part1, sampleInput, 21);
exec(part1, inputFile);

test(part2, sampleInput, 40);
exec(part2, inputFile);

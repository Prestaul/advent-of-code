#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';
import { memoize } from '../helpers/memoize.js';

const match = memoize((towel, patterns) => {
  if (towel.length === 0) return true;

  for (const pattern of patterns)
    if (towel.startsWith(pattern) && match(towel.slice(pattern.length), patterns))
      return true;

  return false;
});

const matchCount = memoize(function (towel, patterns) {
  if (towel.length === 0) return 1;

  let matches = 0;
  for (const pattern of patterns)
    if (towel.startsWith(pattern))
      matches += matchCount(towel.slice(pattern.length), patterns);

  return matches;
}, towel => towel);

function part1(input) {
  const [p1, p2] = input.split('\n\n');
  const patterns = p1.split(', ').sort((a, b) => b.length - a.length).filter((p, i, ps) => !match(p, ps.slice(i + 1)));
  return p2.split('\n').filter(t => match(t, patterns)).length;
}

function part2(input) {
  const [p1, p2] = input.split('\n\n');
  const allPatterns = p1.split(', ').sort((a, b) => b.length - a.length);
  const patterns = allPatterns.filter((p, i, ps) => !match(p, ps.slice(i + 1)));
  return p2.split('\n').filter(t => match(t, patterns)).reduce((acc, towel) => acc + matchCount(towel, allPatterns), 0);
}

const inputFile = 'inputs/2024/day-19.txt';
const sampleInput = `
r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`.trim();

test(part1, sampleInput, 6);
exec(part1, inputFile, 251);

test(part2, sampleInput, 16);
exec(part2, inputFile);

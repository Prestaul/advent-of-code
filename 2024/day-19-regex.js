#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';
import { memoize } from '../helpers/memoize.js';

const match = memoize((towel, patterns) => {
  return new RegExp(`^(?:${patterns.join('|')})+$`).test(towel);
});

function part1_naive(input) {
  // Works on smaller inputs, but has catastrophic backtracking on large numbers of patterns
  const [p1, p2] = input.split('\n\n');
  return p2.match(new RegExp(`^(?:${p1.split(', ').join('|')})+$`, 'mg')).length;
}

function part1_reducePatterns(input) {
  // Works on larger inputs by first removing redundant patterns to reduce backtracking
  const [p1, p2] = input.split('\n\n');
  const patterns = p1.split(', ').sort((a, b) => b.length - a.length).filter((p, i, ps) => !match(p, ps.slice(i + 1)));
  return p2.match(new RegExp(`^(?:${patterns.join('|')})+$`, 'mg')).length;
}

function part2(input) {
  const [p1, p2] = input.split('\n\n');
  const allPatterns = p1.split(', ').sort((a, b) => b.length - a.length);

  // Remove redundant patterns to reduce backtracking
  const patterns = allPatterns.filter((p, i, ps) => !match(p, ps.slice(i + 1)));

  // Find matching towels
  const towels = p2.match(new RegExp(`^(?:${patterns.join('|')})+$`, 'mg'));

  // Create one regex for each pattern length
  const patternsByLength =
    Object.entries(Object.groupBy(allPatterns, p => p.length))
      .map(([len, p]) => [len, new RegExp(`^(?:${p.join('|')})`)]);

  const matchCount = memoize(function (towel) {
    if (towel.length === 0) return 1;

    let matches = 0;
    // Have to match on patterns of increasing length
    for( const [len, regex] of patternsByLength)
      if (towel.length >= len && regex.test(towel))
        matches += matchCount(towel.slice(len), patternsByLength);

    return matches;
  });

  // Count ways to match on matched towels
  return towels.reduce((acc, towel) => acc + matchCount(towel, patternsByLength), 0);
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

test(part1_naive, sampleInput, 6);
exec(part1_reducePatterns, inputFile, 251);

test(part2, sampleInput, 16);
exec(part2, inputFile, 616957151871345);

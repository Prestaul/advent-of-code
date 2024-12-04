#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function matchCount(strings, patterns) {
  const regexes = patterns.map(p => new RegExp(p, 'gs'));

  let count = 0, match;
  for (const str of strings)
    for (const regex of regexes)
      while(match = regex.exec(str))
        (count++, regex.lastIndex = match.index + 1);

  return count;
}

function part1(input) {
  const ll = input.indexOf('\n');
  return matchCount([input, Array.from(input).toReversed().join('')], [
    `XMAS`,
    `X.{${ll - 1}}M.{${ll - 1}}A.{${ll - 1}}S`,
    `X.{${ll}}M.{${ll}}A.{${ll}}S`,
    `X.{${ll + 1}}M.{${ll + 1}}A.{${ll + 1}}S`
  ]);
}

function part2(input) {
  const ll = input.indexOf('\n') - 1;
  return matchCount([input, Array.from(input).toReversed().join('')], [
    `M.M.{${ll}}A.{${ll}}S.S`,
    `M.S.{${ll}}A.{${ll}}M.S`
  ]);
}

const sampleInput = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`.trim();
test(part1, sampleInput, 18);
test(part2, sampleInput, 9);

const inputFile = 'inputs/2024/day-04.txt';
exec(part1, inputFile, 2414);
exec(part2, inputFile, 1871);

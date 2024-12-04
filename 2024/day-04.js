#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function count(str, pattern) {
  const regex = new RegExp(pattern, 'gs');
  let i = 0, match;
  while(match = regex.exec(str)) {
    i++;
    regex.lastIndex = match.index + 1;
  }
  return i;
}

function part1(input) {
  const ll = input.indexOf('\n');
  const tupni = Array.from(input).toReversed().join('');
  return count(input, `XMAS`)
    + count(input, `X.{${ll - 1}}M.{${ll - 1}}A.{${ll - 1}}S`)
    + count(input, `X.{${ll}}M.{${ll}}A.{${ll}}S`)
    + count(input, `X.{${ll + 1}}M.{${ll + 1}}A.{${ll + 1}}S`)
    + count(tupni, `XMAS`)
    + count(tupni, `X.{${ll - 1}}M.{${ll - 1}}A.{${ll - 1}}S`)
    + count(tupni, `X.{${ll}}M.{${ll}}A.{${ll}}S`)
    + count(tupni, `X.{${ll + 1}}M.{${ll + 1}}A.{${ll + 1}}S`)
}

function part2(input) {
  const ll = input.indexOf('\n');
  const tupni = Array.from(input).toReversed().join('');
  return count(input, `M.M.{${ll - 1}}A.{${ll - 1}}S.S`)
    + count(input, `M.S.{${ll - 1}}A.{${ll - 1}}M.S`)
    + count(tupni, `M.M.{${ll - 1}}A.{${ll - 1}}S.S`)
    + count(tupni, `M.S.{${ll - 1}}A.{${ll - 1}}M.S`)
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
exec(part1, inputFile); // => 2414
exec(part2, inputFile); // => 1871

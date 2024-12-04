#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  const lines = input.split('\n');
  let count = 0;

  for (let y = 0; y < lines.length; y++)
    for (let x = 0; x < lines[y].length; x++)
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++)
          if (Object.entries('XMAS').every(([i, v]) => lines[y + i * dy]?.[x + i * dx] === v)) count++;

  return count;
}

function part2(input) {
  const lines = input.split('\n');
  let count = 0;

  for (let y = 1; y < lines.length - 1; y++)
    for (let x = 1, matches = 0; x < lines[y].length - 1; x++, count += matches === 2 ? 1 : 0, matches = 0)
      for (let dy = -1; dy <= 1; dy += 2)
        for (let dx = -1; dx <= 1 && matches < 2; dx += 2)
          if (Object.entries('MAS').every(([i, v]) => lines[y + (i - 1) * dy]?.[x + (i - 1) * dx] === v)) matches++;

  return count;
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

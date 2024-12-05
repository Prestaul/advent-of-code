#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(i) {
  const c = Object.entries('XMAS')
  return i.split`\n`.map((r, y, l) => [...r].map((_, x) => [-1,0,1].map(dy => [-1,0,1].map(dx =>
    c.every(([i, v]) => l[y + i * dy]?.[x + i * dx] === v)
  )))).flat(3).reduce((a, b) => a + b)
}

function part2(i) {
  return i.split`\n`.flatMap((r, y, l) => [...r].map((c, x) =>
    c === 'A' & [-1, 1].every(dy => /MS|SM/.test(l[y + dy]?.[x - 1] + l[y - dy]?.[x + 1]))
  )).reduce((a, b) => a + b)
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

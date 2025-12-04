#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function remove(input) {
  const rows = input.split('\n');
  const w = rows[0].length;
  const h = rows.length;

  let remove = [];
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      if (rows[y][x] !== '@') continue;

      const adjacent =
        (rows[y - 1]?.[x] === '@' ? 1 : 0) +
        (rows[y + 1]?.[x] === '@' ? 1 : 0) +
        (rows[y]?.[x - 1] === '@' ? 1 : 0) +
        (rows[y]?.[x + 1] === '@' ? 1 : 0) +
        (rows[y - 1]?.[x - 1] === '@' ? 1 : 0) +
        (rows[y - 1]?.[x + 1] === '@' ? 1 : 0) +
        (rows[y + 1]?.[x - 1] === '@' ? 1 : 0) +
        (rows[y + 1]?.[x + 1] === '@' ? 1 : 0);

      if (adjacent < 4) remove.push([x, y].toString());
    }

  for (const r of remove) {
    const [x, y] = r.split(',').map(Number);
    rows[y] = rows[y].substring(0, x) + 'x' + rows[y].substring(x + 1);
  }

  return [remove.length, rows.join('\n')];
}

function solve1(input) {
  return remove(input)[0];
}

function solve2(input) {
  let removed = 0, totalRemoved = 0;
  do {
    [removed, input] = remove(input);
    totalRemoved += removed;
  } while (removed > 0);
  return totalRemoved;
}

const inputFile = 'inputs/2025/day-04.txt';
const sampleInput = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`.trim();

test(solve1, sampleInput, 13);
exec(solve1, inputFile, 1424);

test(solve2, sampleInput, 43);
exec(solve2, inputFile, null);

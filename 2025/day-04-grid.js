#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';
import { getGrid, NESW, DIAGS } from '../helpers/grid.js';
const ALL_DIRS = NESW.concat(DIAGS);

function solve1(input) {
  let { grid, reduce } = getGrid({ input });
  return reduce((acc, v, x, y) => acc + (v === '@' && ALL_DIRS.reduce((a, [dx, dy]) => a + (grid[y + dy]?.[x + dx] === '@'), 0) < 4), 0);
}

function solve2(input) {
  let { grid, reduce } = getGrid({ input }), removed, totalRemoved = 0;
  while(removed = reduce((acc, v, x, y) => {
    const remove = v === '@' && ALL_DIRS.reduce((a, [dx, dy]) => a + (grid[y + dy]?.[x + dx] === '@'), 0) < 4;
    if (remove) grid[y][x] = 'x';
    return acc + remove;
  }, 0)) totalRemoved += removed;
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
exec(solve2, inputFile, 8727);

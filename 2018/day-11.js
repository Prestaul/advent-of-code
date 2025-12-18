#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';
import { getGrid } from '../helpers/grid.js';

function findMax(grid, size) {
  let max = -Infinity, xMax, yMax;
  const limit = 300 - size;
  for (let y = 0; y <= limit; y++) {
    for (let x = 0; x <= limit; x++) {
      let sum = 0;
      for (let dx = 0; dx < size; dx++)
        for (let dy = 0; dy < size; dy++)
          sum += grid[y+dy][x+dx];
      if (sum <= max) continue;
      max = sum, xMax = x, yMax = y;
    }
  }
  return [xMax + 1, yMax + 1, max];
}

function part1(sn) {
  const { grid } = getGrid({
    width: 300,
    height: 300,
    init(_, x, y) {
      const rackId = x + 11;
      const pow = (rackId * (y + 1) + sn) * rackId;
      return Math.trunc((pow % 1000) / 100) - 5;
    }
  });

  const [x, y] = findMax(grid, 3, 3);
  return [x, y].join();
}

function part2(sn) {
  const { grid } = getGrid({
    width: 300,
    height: 300,
    init(_, x, y) {
      const rackId = x + 11;
      const pow = (rackId * (y + 1) + sn) * rackId;
      return Math.trunc((pow % 1000) / 100) - 5;
    }
  });

  let max = -Infinity;
  let coord = null;
  for (let n = 10; n < 20; n++) {
    const [x, y, v] = findMax(grid, n);
    if (v < max) continue;
    max = v;
    coord = [x, y, n].join();
  }

  return coord;
}

test(part1, 18, '33,45');
test(part1, 42, '21,61');
test(part1, 1718, '243,34');

test(part2, 18, '90,269,16');
test(part2, 42, '232,251,12');
test(part2, 1718, '90,214,15');

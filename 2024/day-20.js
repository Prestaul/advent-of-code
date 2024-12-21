#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';
import { getGrid, NESW } from '../helpers/grid.js';

function solve(input, time, limit = 100) {
  const { grid, w, h, coords, filled } = getGrid(input);
  const dist = filled(Infinity);
  const wave = [coords('S', 0)];

  for (const [x, y, d] of wave) if (grid[y][x] !== '#' && dist[y][x] === Infinity) {
    dist[y][x] = d;
    for (const [dx, dy] of NESW) wave.push([x + dx, y + dy, d + 1]);
  }

  // Look at every cell and inspect the surrounding cells within `time` steps
  let count = 0;
  for (let x = 1; x < w - 1; x++) for(let y = 1; y < h - 1; y++) if (grid[y][x] !== '#') {
    const d2 = dist[y][x] - limit;

    for (let dx = -time, ddx = time; dx <= time; dx++, ddx = Math.abs(dx))
      for (let dy = ddx - time; dy <= time - ddx; dy++)
        if ((dist[y + dy]?.[x + dx] ?? Infinity) <= (d2 - ddx - Math.abs(dy))) count += 1;
  }
  return count;
}

const inputFile = 'inputs/2024/day-20.txt';
const sampleInput = `
###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`.trim();

test(solve, sampleInput, 5, 2, 20);
exec(solve, inputFile, 1286, 2, 100);

test(solve, sampleInput, 29, 20, 72);
exec(solve, inputFile, 989316, 20, 100);

#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function solve(input, time, limit = 100) {
  const grid = input.split('\n').map(l => l.split(''));
  const w = grid[0].length, h = grid.length;
  const dist = Array(h).fill().map(_ => Array(w).fill(Infinity));

  // Get all walkable distances
  const s = input.indexOf('S');
  const wave = [[s % (w + 1), Math.floor(s / (w + 1)), 0]];
  for (const [x, y, d] of wave) {
    if (grid[y][x] === '#' || dist[y][x] < Infinity) continue;
    dist[y][x] = d;

    wave.push([x+1, y  , d+1]);
    wave.push([x-1, y  , d+1]);
    wave.push([x  , y+1, d+1]);
    wave.push([x  , y-1, d+1]);
  }

  // Walk back from the end
  const e = input.indexOf('E');
  let x = e % (w + 1), y = Math.floor(e / (w + 1));
  let count = 0;
  while (dist[y][x] > 0) {
    const d = dist[y][x];
    const d2 = d - limit;

    // Look at all the spaces reachable during cheat time
    for (let dx = -time; dx <= time; dx++) {
      const ddx = Math.abs(dx);
      for (let dy = ddx - time; dy <= time - ddx; dy++) {
        if ((dist[y + dy]?.[x + dx] ?? Infinity) <= (d2 - ddx - Math.abs(dy))) count += 1;
      }
    }

    // Move to the next space
    if (dist[y - 1][x] < d) y -= 1;
    else if (dist[y + 1][x] < d) y += 1;
    else if (dist[y][x - 1] < d) x -= 1;
    else x += 1;
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

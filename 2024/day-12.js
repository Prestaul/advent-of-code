#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  const grid = input.split('\n').map(l => l.split(''));
  const h = grid.length;
  const w = grid[0].length;

  // Track which cells have been added to a plot
  const plotted = Array.from({ length: h }, () => new Array(w).fill(0));

  let sum = 0;
  for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) {
    if (!plotted[y][x]) {
      // Do a walk of the plot
      const flower = grid[y][x];
      const plot = { area: 0, perimeter: 0 };

      const visited = Array.from({ length: h }, () => new Array(w).fill(0));
      const frontier = [[x, y]];
      while (frontier.length) {
        const [x, y] = frontier.pop();
        const v = visited[y]?.[x];
        const p = grid[y]?.[x];

        if (p && !v) visited[y][x] = 1;

        if (!p || (p !== flower)) {
          plot.perimeter++;
          continue;
        }

        if (v) continue;

        plot.area++;
        plotted[y][x] = 1;
        frontier.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
      }
      sum += plot.area * plot.perimeter;
    }
  }

  return sum;
}

// Order matters here
const DIRS = [
  [ 1,  0],
  [ 0,  1],
  [-1,  0],
  [ 0, -1],
];
function part2(input) {
  const grid = input.split('\n').map(l => l.split(''));
  const h = grid.length, w = grid[0].length;

  // Track which cells have been added to a plot
  const plotted = Array.from({ length: h }, () => new Array(w).fill(0));

  let sum = 0;
  for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) {
    if (!plotted[y][x]) {
      const flower = grid[y][x];
      const plot = { area: 0, perimeter: 0 };

      const frontier = [[x, y]];
      while (frontier.length) {
        const [x, y] = frontier.pop();
        if (grid[y]?.[x] !== flower || plotted[y]?.[x]) continue;

        // Look at each of the 4 blocks of 4 with this cell in one corner.
        for (let d = 0; d < DIRS.length; d++) {
          const [dx1, dy1] = DIRS[d];
          const [dx2, dy2] = DIRS[(d + 1) % 4];
          // Count matches of this cell in the square on each diagonal.
          // d1 = diagonal to us, d2 = the others
          const d1 = 1 + (grid[y + (dy1 || dy2)]?.[x + (dx1 || dx2)] === flower);
          const d2 = (grid[y][x + (dx1 || dx2)] === flower) + (grid[y + (dy1 || dy2)]?.[x] === flower);
          // Draw up all the possible 2x2 blocks, count up matches on diagonals, and you'll see that this condition finds corner cells.
          if (d2 === 0 || (d1 === 1 && d2 === 2)) plot.perimeter++;
        }

        plot.area++;
        plotted[y][x] = 1;
        frontier.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
      }
      sum += plot.area * plot.perimeter;
    }
  }

  return sum;
}

const inputFile = 'inputs/2024/day-12.txt';
const sampleInput = `
AAAA
BBCD
BBCC
EEEC`.trim();
const sampleInput2 = `
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`.trim();
const sampleInput3 = `
EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`.trim();
const sampleInput4 = `
AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`.trim();

test(part1, sampleInput, 140);
test(part1, sampleInput2, 1930);
exec(part1, inputFile, 1402544);

test(part2, sampleInput, 80);
test(part2, sampleInput3, 236);
test(part2, sampleInput4, 368);
test(part2, sampleInput2, 1206);
exec(part2, inputFile, 862486);

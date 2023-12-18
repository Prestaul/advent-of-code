#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

const DIR_BY_INDEX = ['R', 'D', 'L', 'U'];
const DIRS = { U: [0, -1], D: [0, 1], L: [-1, 0], R: [1, 0] };
const DIRS_LIST = Object.values(DIRS);

function dig(ops, xFill, yFill) {
  // 1. Find points in path
  let path = [[0, 0]];
  let x = 0, y = 0;
  for (const { dir: [dx, dy], steps } of ops)
    path.push([x += dx * steps, y += dy * steps]);

  // 2. Shift path to origin (all coordinates >= zero)
  const xMin = Math.min(...path.map(([x]) => x));
  const yMin = Math.min(...path.map(([y]) => y));
  path = path.map(([x, y]) => [x - xMin, y - yMin]);

  // 3. Compress coordinates
  // 3.1. Create an index of unique coordinates in each dimension
  // 3.1.1. Get unique coordinates in each dimension and preserve the rows/columns on either
  //       side of each to prevent the grid from collapsing. This makes it easier to flood.
  const xUnique = new Set(path.flatMap(([x,]) => [x - 1, x, x + 1]));
  const yUnique = new Set(path.flatMap(([,y]) => [y - 1, y, y + 1]));
  // 3.1.2. Create a sorted index for each dimension
  const xIndex = [...xUnique].sort((a, b) => a - b);
  const yIndex = [...yUnique].sort((a, b) => a - b);
  // 3.2. Store the size compressed into each indexed coordinate
  const xSizes = xIndex.map((x, i) => xIndex[i + 1] - x || 1);
  const ySizes = yIndex.map((y, i) => yIndex[i + 1] - y || 1);
  // 3.3. Map the path to compressed values
  const compressedPath = path.map(([x, y]) => [xIndex.indexOf(x), yIndex.indexOf(y)]);

  // NOTE: From here forward we only use compressed values (i.e. coordinate indices). Operations
  //       are essentially performed the same as we would if we did not compress, but now our grid
  //       is only as wide/tall as the number of unique coordinates in each dimension and each
  //       compressed coordinate represents a range of values stored in xSizes or ySizes.

  // 4. Render the compressed path in a grid
  const grid = Array(yIndex.length).fill().map(_ => Array(xIndex.length).fill('.'));
  for (let i = compressedPath.length - 1; i--;) {
      const [x0, y0] = compressedPath[i];
      const [x1, y1] = compressedPath[i + 1];
      const dx = Math.sign(x0 - x1);
      const dy = Math.sign(y0 - y1);
      if (dx) for (let x = x1; x !== x0; x += dx) grid[y0][x] = 'X';
      if (dy) for (let y = y1; y !== y0; y += dy) grid[y][x0] = 'X';
  }

  // console.log(grid.map(s => s.join('')).join('\n'));
  // console.log();

  // 5. Flood fill
  const frontier = [[xFill, yFill]];
  while(frontier.length) {
    const [x, y] = frontier.pop();
    if (grid[y][x] === 'X') continue;
    grid[y][x] = 'X';
    for (let [dx, dy] of DIRS_LIST) frontier.push([x + dx, y + dy]);
  }

  // console.log(grid.map(s => s.join('')).join('\n'));

  // 6. Sum up the occupied space using uncompressed size for each cell
  let sum = 0;
  for (let x = xIndex.length; x--;)
    for (let y = yIndex.length; y--;)
      if (grid[y][x] === 'X') sum += xSizes[x] * ySizes[y];

  return sum;
}

function part1(input, xFill, yFill) {
  const ops = input.replaceAll(/[^\w\s]/g).split('\n').map(l => {
    let [dir, steps] = l.split(' ');
    dir = DIRS[dir];
    steps = Number(steps);
    return { dir, steps }
  });

  return dig(ops, xFill, yFill);
}

function part2(input, xFill, yFill) {
  const ops = input.split('\n').map(l => {
    const dir = l.slice(-2, -1);
    const steps = l.slice(-7, -2);
    return {
      dir: DIRS[DIR_BY_INDEX[Number(dir)]],
      steps: parseInt(steps, 16)
    }
  });

  return dig(ops, xFill, yFill);
}

const sampleInput = `
R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`.trim();
test(part1, sampleInput, 2, 2, 62);
test(part2, sampleInput, 2, 2, 952408144115);

const inputFile = '2023/day-18-input';
exec(part1, inputFile, 278, 27); // => 48652
exec(part2, inputFile, 139, 600); // => 45757884535661

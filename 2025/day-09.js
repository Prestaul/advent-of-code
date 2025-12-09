#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';
import { compress } from '../helpers/coordinate-compression.js';
import { NESW } from '../helpers/grid.js';

function part1(input) {
  const points = input.split('\n').map(l => l.split(',').map(Number));
  let maxArea = 0;
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    for (let j = i + 1; j < points.length; j++) {
      const [x2, y2] = points[j];
      maxArea = Math.max(maxArea, (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1));
    }
  }
  return maxArea;
}

function part2(input, xFill, yFill) {
  const points = input.split('\n').map(l => l.split(',').map(Number));
  const xScale = compress(points.map(p => p[0]));
  const yScale = compress(points.map(p => p[1]));

  const w = xScale.count + 1;
  const h = yScale.count + 1;
  const grid = Array.from({ length: h }, () => Array.from({ length: w }, () => '.'));

  const compressedXs = xScale.compressed;
  const compressedYs = yScale.compressed;
  compressedXs.push(compressedXs[0]);
  compressedYs.push(compressedYs[0]);

  let xPrev = compressedXs[0];
  let yPrev = compressedYs[0];
  grid[yPrev][xPrev] = '#';
  for (let i = 1; i < compressedXs.length; i++) {
    const xCurr = compressedXs[i];
    const yCurr = compressedYs[i];

    if (xCurr === xPrev)
      for (let y = Math.min(yPrev, yCurr) + 1, yMax = Math.max(yPrev, yCurr) - 1; y <= yMax; y++) grid[y][xCurr] = 'X';
    else
      for (let x = Math.min(xPrev, xCurr) + 1, xMax = Math.max(xPrev, xCurr) - 1; x <= xMax; x++) grid[yCurr][x] = 'X';

    grid[yCurr][xCurr] = '#';
    xPrev = xCurr;
    yPrev = yCurr;
  }

  const frontier = [[xFill, yFill]];
  while(frontier.length) {
    const [x, y] = frontier.pop();
    if (grid[y][x] !== '.') continue;
    grid[y][x] = 'X';
    for (let [dx, dy] of NESW) frontier.push([x + dx, y + dy]);
  }


  // console.log(grid.map(row => row.join('')).join('\n'));

  let maxArea = 0;
  for (let i = 0; i < compressedXs.length; i++) {
    const x1 = compressedXs[i];
    const y1 = compressedYs[i];
    nextCorner: for (let j = i + 1; j < compressedXs.length; j++) {
      const x2 = compressedXs[j];
      const y2 = compressedYs[j];
      // if there are any periods ('.') inside the rectangle, skip it
      for (let y = Math.min(y1, y2), yMax = Math.max(y1, y2); y <= yMax; y++)
        for (let x = Math.min(x1, x2), xMax = Math.max(x1, x2); x <= xMax; x++)
          if (grid[y][x] === '.')
            continue nextCorner;

      maxArea = Math.max(maxArea, (Math.abs(xScale.uncompress(x1) - xScale.uncompress(x2)) + 1) * (Math.abs(yScale.uncompress(y1) - yScale.uncompress(y2)) + 1));
    }
  }
  return maxArea;
}

const inputFile = 'inputs/2025/day-09.txt';
const sampleInput = `
7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`.trim();

test(part1, sampleInput, 50);
exec(part1, inputFile, 4759420470);

test(part2, sampleInput, 24, 2, 1);
exec(part2, inputFile, 1603439684, 124, 50);

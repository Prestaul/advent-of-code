#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';
import { compressPoints } from '../helpers/coordinate-compression.js';
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

  // Compress the points so we can work on a smaller grid
  const { axes, uncompress, compressed } = compressPoints(points);

  const grid = Array.from({ length: axes[1].count + 1 }, () => Array.from({ length: axes[0].count + 1 }, () => '.'));

  // Add first point to the end to close the loop
  compressed.push(compressed[0]);

  // Follow the edges and mark them on the grid
  let [xPrev, yPrev] = compressed[0];
  grid[yPrev][xPrev] = '#';
  for (let i = 1; i < compressed.length; i++) {
    const [xCurr, yCurr] = compressed[i];
    grid[yCurr][xCurr] = '#';

    for (let x = xPrev, y = yPrev, dx = Math.sign(xCurr - xPrev), dy = Math.sign(yCurr - yPrev); x !== xCurr || y !== yCurr; x += dx, y += dy)
      grid[y][x] = 'X';

    xPrev = xCurr;
    yPrev = yCurr;
  }

  // Fill from the given point (cheating by just passing in any point we know is inside)
  const frontier = [[xFill, yFill]];
  while(frontier.length) {
    const [x, y] = frontier.pop();
    if (grid[y][x] !== '.') continue;
    grid[y][x] = 'X';
    for (let [dx, dy] of NESW) frontier.push([x + dx, y + dy]);
  }

  // Print the compressed grid for debugging
  // console.log(grid.map(row => row.join('')).join('\n'));

  // Find the largest rectangle that doesn't include any points outside the shape
  let maxArea = 0;
  for (let i = 0; i < compressed.length; i++) {
    const [x1, y1] = compressed[i];
    nextCorner: for (let j = i + 1; j < compressed.length; j++) {
      const [x2, y2] = compressed[j];
      // if there are any empty spaces inside the rectangle, skip it
      for (let y = Math.min(y1, y2), yMax = Math.max(y1, y2); y <= yMax; y++)
        for (let x = Math.min(x1, x2), xMax = Math.max(x1, x2); x <= xMax; x++)
          if (grid[y][x] === '.')
            continue nextCorner;

      // Use uncompressed points to calculate area
      const [ux1, uy1] = uncompress([x1, y1]);
      const [ux2, uy2] = uncompress([x2, y2]);
      maxArea = Math.max(maxArea, (Math.abs(ux1 - ux2) + 1) * (Math.abs(uy1 - uy2) + 1));
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

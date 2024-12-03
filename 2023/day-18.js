#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

const DIR_BY_INDEX = ['R', 'D', 'L', 'U'];
const DIRS = { U: [0, -1], D: [0, 1], L: [-1, 0], R: [1, 0] };
const DIRS_LIST = Object.values(DIRS);

function dig(ops) {
  let sum = 0;
  let [x0, y0] = [0, 0];
  for (let { dir: [dx, dy], steps } of ops) {
    const [x1, y1] = [x0 + steps * dx, y0 + steps * dy];
    // Green's theorum, plus the area under the line
    // https://stackoverflow.com/a/451482
    sum += x0 * y1 - x1 * y0 + Math.abs(steps);
    [x0, y0] = [x1, y1];
  }
  return sum / 2 + 1; // Why do I have to add 1 here? Did I miss the starting square?
}

function part1(input, xFill, yFill) {
  return dig(input.replaceAll(/[^\w\s]/g).split('\n').map(l => {
    let [dir, steps] = l.split(' ');
    dir = DIRS[dir];
    steps = Number(steps);
    return { dir, steps }
  }));

  // Original part 1 solution
  // let x = 0, y = 0;
  // let xMin = Number.POSITIVE_INFINITY, xMax = Number.NEGATIVE_INFINITY;
  // let yMin = Number.POSITIVE_INFINITY, yMax = Number.NEGATIVE_INFINITY;
  // for (const { dir: [dx, dy], steps, color} of ops) {
  //   for (let i = steps; i--;) {
  //     x += dx;
  //     y += dy;
  //     if (x < xMin) xMin = x;
  //     if (x > xMax) xMax = x;
  //     if (y < yMin) yMin = y;
  //     if (y > yMax) yMax = y;
  //   }
  // }

  // const grid = Array(xMax - xMin + 1).fill().map(_ => Array(yMax - yMin + 1).fill('.'));
  // x = 0 - xMin;
  // y = 0 - yMin;
  // for (const { dir: [dx, dy], steps, color} of ops) {
  //   for (let i = steps; i--;) {
  //     grid[x][y] = 'X';
  //     x += dx;
  //     y += dy;
  //   }
  // }

  // const f = [[xFill, yFill]];
  // while(f.length) {
  //   const [x, y] = f.pop();
  //   if (grid[x][y] === 'X') continue;
  //   // if (!grid[x]?.[y] || grid[x][y] === 'X') continue;
  //   grid[x][y] = 'X';
  //   for (let [dx, dy] of DIRS_LIST) f.push([x + dx, y + dy]);
  // }

  // console.log(grid.map(s => s.join('')).join('\n'));
  // return grid.flat().reduce((sum, s) => s === 'X' ? sum + 1 : sum, 0);
}

function part2(input) {
  return dig(input.split('\n').map(l => {
    const dir = l.slice(-2, -1);
    const steps = l.slice(-7, -2);
    return {
      dir: DIRS[DIR_BY_INDEX[Number(dir)]],
      steps: parseInt(steps, 16)
    }
  }));
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
test(part1, sampleInput, 3, 3, 62);
test(part2, sampleInput, 952408144115);

const inputFile = '2023/day-18-input.txt';
exec(part1, inputFile, 290, 5); // => 48652
exec(part2, inputFile); // => 45757884535661

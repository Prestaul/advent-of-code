#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

const dirs = {
  '^': [0, -1,'>'],
  '>': [1, 0,'v'],
  'v': [0, 1,'<'],
  '<': [-1, 0,'^'],
}

function walk(input, grid, onTurn) {
  grid ??= input.split('\n').map(l => l.split(''));
  const s = input.indexOf('^');
  const w = grid[0].length;

  let x = s % (w + 1);
  let y = Math.floor(s / (w + 1));
  let [dx, dy, next] = dirs['^'];

  do {
    if (grid[y + dy]?.[x + dx] === '#') {
      while(grid[y + dy]?.[x + dx] === '#') [dx, dy, next] = dirs[next];
      if (onTurn?.(x, y) === false) break;
    }

    if (!onTurn) grid[y][x] = 'X';
  } while (grid[y += dy]?.[x += dx])

  return grid;
}

function segmentOverlap(a1, a2, b1, b2) {
  [a1, a2] = [Math.min(a1, a2), Math.max(a1, a2)];
  [b1, b2] = [Math.min(b1, b2), Math.max(b1, b2)];
  return Math.max(0, Math.min(a2, b2) - Math.max(a1, b1));
}

function part1(input) {
  const w = input.indexOf('\n');
  const s = input.indexOf('^');
  const h = (input.length + 1) / (w + 1);
  const obstacles = [...input.matchAll(/#/sg)].map(m => [m.index % (w + 1), Math.floor(m.index / (w + 1))]);
  const xObstacles = obstacles.sort(([,a],[,b]) => a - b).reduce((m, [x, y]) => (m[x] ??= []).push(y) &&  m, {});
  const yObstacles = obstacles.sort(([a],[b]) => a - b).reduce((m, [x, y]) => (m[y] ??= []).push(x) &&  m, {});

  // console.log('h', h);
  // console.log('xObstacles', xObstacles);
  // console.log('yObstacles', yObstacles);

  let x = s % (w + 1);
  let y = Math.floor(s / (w + 1));
  let [dx, dy, next] = dirs['^'];
  let count = 0;
  let turns = 0;
  let hPaths = [];
  let vPaths = [];

  let i = 0;
  while(i++ < 1000) {
    let dist = (
      dx > 0 ? yObstacles[y].find(v => v > x) - x :
      dx ? x - yObstacles[y].findLast(v => v < x) :
      dy > 0 ? xObstacles[x].find(v => v > y) - y :
      y - xObstacles[x].findLast(v => v < y)
    ) - 1;

    const offEdge = isNaN(dist);

    if (offEdge) dist = (
      dx > 0 ? w - x :
      dx ? x :
      dy > 0 ? h - y :
      y
    ) - 1;

    const xNext = x + dx * dist;
    const yNext = y + dy * dist;

    const crossings = dx
      ? vPaths.filter(({ x1, y1, y2 }) => x < x1 && x1 <= x + dx * dist && y1 < y && y <= y2).length
      : hPaths.filter(({ x1, y1, x2 }) => y < y1 && y1 <= y + dy * dist && x1 < x && x <= x2).length;

    const overlap = dx
      ? hPaths.reduce((acc, { x1, y1, x2 }) => y !== y1 ? acc : segmentOverlap(x, xNext, x1, x2) + acc, 0)
      : vPaths.reduce((acc, { y1, x1, y2 }) => x !== x1 ? acc : segmentOverlap(y, yNext, y1, y2) + acc, 0);

    count += dist - crossings - overlap;

    // console.log({ x, y, dist, crossings, count, offEdge });

    if (offEdge) {
      console.log(turns);
      return count;
    }

    if (dx) {
      hPaths.push({ y1: y, x1: Math.min(x, xNext), x2: Math.max(x, xNext) });
      x = xNext;
    } else {
      vPaths.push({ x1: x, y1: Math.min(y, yNext), y2: Math.max(y, yNext) });
      y = yNext;
    }

    [dx, dy, next] = dirs[next];
    // console.log(xObstacles[x + dx]?.includes(y + dy))
    while(xObstacles[x + dx]?.includes(y + dy)) [dx, dy, next] = dirs[next];

    turns++;
  }
}

const sampleInput = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`.trim();
test(part1, sampleInput, 41);
// test(part2, sampleInput, 6);

const inputFile = 'inputs/2024/day-06.txt';
exec(part1, inputFile, 4789);
// exec(part2, inputFile, 1304);

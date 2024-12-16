#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';
import { Heap } from 'heap-js';

const dirs = [
  [ 0, -1],
  [ 1,  0],
  [ 0,  1],
  [-1,  0],
];

function part1(input) {
  const grid = input.split('\n').map(l => l.split(''));
  const s = input.indexOf('S');
  const w = grid[0].length, h = grid.length;

  const costs = Array(h).fill().map(_ => Array(w).fill().map(_ => ({ [-1]: [Infinity], [0]: [Infinity, Infinity], [1]: [Infinity] })));

  const frontier = new Heap((a, b) => a[4] - b[4]);
  frontier.init([[ s % (w + 1), Math.floor(s / (w + 1)), 1, 0, 0 ]]);

  function addToFrontier(x, y, dx, dy, cost) {
    x += dx;
    y += dy;

    if (grid[y][x] === '#') return;

    const c = costs[y][x][dy][dx];
    if (cost >= c) return;
    costs[y][x][dy][dx] = cost;

    frontier.push([x, y, dx, dy, cost]);
  }

  for (let [ x, y, dx, dy, cost ] of frontier) {
    if (grid[y][x] === 'E') return cost;

    addToFrontier( x, y,  dx,  dy, cost + 1 );
    addToFrontier( x, y, -dy,  dx, cost + 1001 );
    addToFrontier( x, y,  dy, -dx, cost + 1001 );
  }
}

function part2(input) {
  const grid = input.split('\n').map(l => l.split(''));
  const s = input.indexOf('S');
  const e = input.indexOf('E');
  const w = grid[0].length, h = grid.length;
  const xs = s % (w + 1);
  const ys = Math.floor(s / (w + 1));
  const xl = e % (w + 1);
  const yl = Math.floor(e / (w + 1));

  const costs = Array(h).fill().map(_ => Array(w).fill().map(_ => Array(4).fill(Infinity)));

  const frontier = new Heap((a, b) => a[3] - b[3]);
  frontier.init([[xs, ys, 1, 0 ]]);

  function addToFrontier(x, y, d, cost) {
    const [dx, dy] = dirs[d];
    const x2 = x + dx, y2 = y + dy;

    if (grid[y2][x2] === '#') return;

    const c = costs[y][x][d];
    if (cost >= c) return;
    costs[y][x][d] = cost;

    frontier.push([x2, y2, d, cost]);
  }

  for (let [ x, y, d, cost ] of frontier) {
    if (grid[y][x] === 'E') return count2(grid, costs, xl, yl);

    addToFrontier(x, y, d, cost + 1);
    addToFrontier(x, y, (d + 1) % 4, cost + 1001);
    addToFrontier(x, y, (d + 3) % 4, cost + 1001);
  }
}

function count2(grid, costs, xs, ys) {
  const frontier = new Heap((a, b) => b[2] - a[2]);
  frontier.init([[ xs, ys, costs[ys+1][xs][0] ]]);
  const visited = new Set([`${xs},${ys}`]);

  function addToFrontier(x, y, cost, d) {
    const c = costs[y][x][(d + 2) % 4];
    if (c > cost) return;
    frontier.push([x, y, c]);
  }

  for (const [ x, y, cost ] of frontier) {
    visited.add(`${x},${y}`);
    if (grid[y][x] === 'S') return visited.size;
    dirs.forEach(([dx, dy], d) => {
      addToFrontier( x + dx, y + dy, cost, d);
    });
  }

  throw new Error('No result...');
}

const inputFile = 'inputs/2024/day-16.txt';
const sampleInput = `
###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`.trim();
const sample2 = `
#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`.trim();

test(part1, sampleInput, 7036);
test(part1, sample2, 11048);
exec(part1, inputFile);

test(part2, sampleInput, 45);
test(part2, sample2, 64);
exec(part2, inputFile);

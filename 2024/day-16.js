#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';
import { Heap } from 'heap-js';
import { getGrid } from '../helpers/grid.js';

function solve(input, part) {
  const { grid, coords, filled } = getGrid(input);
  const costs = filled(() => ({
    [-1]: [Infinity],
    [ 0]: { [-1]: Infinity, [1]: Infinity },
    [ 1]: [Infinity]
  }));
  const [xs, ys] = coords('S');

  // Walk the cheapest paths until we reach the exit
  const frontier = new Heap((a, b) => a[4] - b[4]);
  frontier.init([[xs, ys, 1, 0, 0 ]]); // x, y, dx, dy, cost

  function addToFrontier(x, y, dx, dy, cost) {
    // Cost to leave the cell in this direction
    if (Number.isFinite(costs[y][x][dy][dx])) return;
    costs[y][x][dy][dx] = cost;

    frontier.push([x + dx, y + dy, dx, dy, cost]);
  }

  for (let [ x, y, dx, dy, cost ] of frontier) {
    if (grid[y][x] === '#') continue;
    if (grid[y][x] === 'E')
      return part === 1 ? cost : count(grid, costs, cost, x, y);

    addToFrontier(x, y,  dx,  dy, cost + 1);
    addToFrontier(x, y, -dy,  dx, cost + 1001);
    addToFrontier(x, y,  dy, -dx, cost + 1001);
  }
}

function count(grid, costs, bestCost, xs, ys) {
  // Walk decreasing costs from end until we reach the start
  const frontier = new Heap((a, b) => b[2] - a[2]);
  frontier.init([[ xs, ys, bestCost ]]);

  function addToFrontier(x, y, dx, dy, cost) {
    x += dx, y += dy;
    // Cost to enter this cell from the opposite direction
    const c = costs[y][x][-dy][-dx];
    if (c > cost) return;
    frontier.push([x, y, c]);
  }

  let visited = 0;
  for (const [ x, y, cost ] of frontier) {
    if (grid[y][x] !== 'O') visited++;
    grid[y][x] = 'O';

    addToFrontier(x, y,  0, -1, cost);
    addToFrontier(x, y,  1,  0, cost);
    addToFrontier(x, y,  0,  1, cost);
    addToFrontier(x, y, -1,  0, cost);
  }

  // console.log(grid.map(l => l.join('')).join('\n'));
  return visited;
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

test(solve, sampleInput, 7036, 1);
test(solve, sample2, 11048, 1);
exec(solve, inputFile, 83432, 1);

test(solve, sampleInput, 45, 2);
test(solve, sample2, 64, 2);
exec(solve, inputFile, 467, 2);

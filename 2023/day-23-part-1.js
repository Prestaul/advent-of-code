#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';
import { Heap } from 'heap-js';

function walk(grid) {
  const h = grid.length;
  const w = grid[0].length;
  const distances = Array(h).fill().map(_ => Array(w).fill(0));

  const opposites = {
    '^': 'v',
    'v': '^',
    '<': '>',
    '>': '<',
  };
  const frontier = new Heap((a, b) => b[2] - a[2]);
  frontier.init([[0, 1, 0, 'v']]);
  let maxDist = 0;
  function addToFrontier(r, c, dist, dir) {
    const cell = grid[r]?.[c];
    // console.log(r, c, cell, dir, opposites[dir], distances[r]?.[c])
    if (!cell || cell === '#' || cell.includes(opposites[dir]) || distances[r][c] >= dist) return false;

    distances[r][c] = dist;
    frontier.push([r, c, dist, dir]);
    return true;
  }

  let cell;
  // let i = 0;
  while (cell = frontier.pop()) {
    const [r, c, dist, dir] = cell;
    // console.log(cell);
    if (addToFrontier(r - 1, c, dist + 1, '^')) grid[r][c] += '^';
    if (addToFrontier(r + 1, c, dist + 1, 'v')) grid[r][c] += 'v';
    if (addToFrontier(r, c - 1, dist + 1, '<')) grid[r][c] += '<';
    if (addToFrontier(r, c + 1, dist + 1, '>')) grid[r][c] += '>';
    // if (i++ > 1000) break;
  }
  // console.log(grid.map(s => s.map(s => s.at(-1)).join('')).join('\n'))
  return distances[h - 1][w - 2];
}

const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]]
function DFS(grid, r, c, dist, visited = Array(grid.length).fill().map(_ => Array(grid[0].length))) {
  visited[r][c] = true;
  let curLen = 0;

  for (const [dr, dc] of DIRS) {
    if (!visited[r + dr][c + dc]) {
      DFS(gird, r + dr, c + dc, dist + 1, visited);
    }
  }

  return visited;
}

function part1(input) {
  return walk(input.split('\n').map(l => l.split('')));
}

const sampleInput = `
#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#`.trim();
test(part1, sampleInput, 94);

const inputFile = '2023/day-23-input.txt';
exec(part1, inputFile); // => 2366

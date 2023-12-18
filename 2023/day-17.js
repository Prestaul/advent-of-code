#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';
import { Heap } from 'heap-js';

function shortestPath(input, minTurns, maxTurns) {
  const grid = input.split('\n').map(l => l.split('').map(Number));
  let h = grid.length - 1;
  let w = grid[0].length - 1;
  const directions = Array(h + 1).fill().map(_ => Array(w + 1).fill('.').map(_ => []));;

  let result;
  const frontier = new Heap((a, b) => a[2] - b[2]);
  frontier.init([[0, 0, 0, '', 0]]);

  function addToFrontier(x, y, dist, dir, repetitions) {
    const val = grid[y]?.[x];
    if (!val || repetitions > maxTurns || directions[y][x].includes(dir + repetitions)) return;

    frontier.push([x, y, dist + val, dir, repetitions]);
    directions[y][x].push(dir + repetitions);

    if (x === w && y === h) result = dist + val;
  }

  for (const [x, y, dist, dir, r] of frontier) {
    if (r < minTurns && dir) {
      switch(dir) {
        case '>': addToFrontier(x + 1, y, dist, '>', r + 1); break;
        case 'v': addToFrontier(x, y + 1, dist, 'v', r + 1); break;
        case '^': addToFrontier(x, y - 1, dist, '^', r + 1); break;
        case '<': addToFrontier(x - 1, y, dist, '<', r + 1); break;
      }
    } else {
      if (dir !== '<') addToFrontier(x + 1, y, dist, '>', dir === '>' ? r + 1 : 1);
      if (dir !== '^') addToFrontier(x, y + 1, dist, 'v', dir === 'v' ? r + 1 : 1);
      if (dir !== 'v') addToFrontier(x, y - 1, dist, '^', dir === '^' ? r + 1 : 1);
      if (dir !== '>') addToFrontier(x - 1, y, dist, '<', dir === '<' ? r + 1 : 1);
    }
    if (result) return result;
  }

  console.log('No result...');
}

function part1(input) {
  return shortestPath(input, 0, 3);
}

function part2(input) {
  return shortestPath(input, 4, 10);
}

const sampleInput = `
2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`.trim();
test(part1, sampleInput, 102);
test(part2, sampleInput, 94);

const inputFile = '2023/day-17-input';
exec(part1, inputFile); // => 843
exec(part2, inputFile); // => 1017

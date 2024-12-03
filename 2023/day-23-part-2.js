#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function getGraph(input) {
  const grid = input.replaceAll(/[^#\n]/g, ' ').split('\n').map(l => l.split(''));
  const h = grid.length - 1;
  const graph = [];

  function getNeighbors([r, c]) {
    const cells = [];
    if (grid[r - 1]?.[c] === ' ') cells.push([r - 1, c]);
    if (grid[r + 1]?.[c] === ' ') cells.push([r + 1, c]);
    if (grid[r][c - 1] === ' ') cells.push([r, c - 1]);
    if (grid[r][c + 1] === ' ') cells.push([r, c + 1]);
    return cells;
  }

  function edge(a, b, dist) {
    graph[a].edges.push({ node: b, dist });
    graph[b].edges.push({ node: a, dist });
  }

  function nextNode([r, c], from) {
    if (grid[r][c] !== ' ') return;

    let dist = 1;
    while(true) {
      if (typeof grid[r][c] === 'number') {
        return edge(from, grid[r][c], dist);
      }

      grid[r][c] = '.';

      const n = grid[r - 1]?.[c] === ' ' || (typeof grid[r - 1]?.[c] === 'number' && grid[r - 1]?.[c] !== from);
      const s = grid[r + 1]?.[c] === ' ' || (typeof grid[r + 1]?.[c] === 'number' && grid[r + 1]?.[c] !== from);
      const w = grid[r][c - 1] === ' ' || (typeof grid[r][c - 1] === 'number' && grid[r][c - 1] !== from);
      const e = grid[r][c + 1] === ' ' || (typeof grid[r][c + 1] === 'number' && grid[r][c + 1] !== from);

      if (r === h || n + s + e + w !== 1) {
        return edge(from, walk(r, c), dist);
      }

      if (n) r -= 1;
      if (s) r += 1;
      if (w) c -= 1;
      if (e) c += 1;

      dist += 1;
    }
  }

  function walk(r, c) {
    const node = { r, c, edges: [] };
    const index = graph.push(node) - 1;
    grid[r][c] = index;
    getNeighbors([r, c]).map(n => nextNode(n, index));
    return index;
  }

  walk(0, 1);

  // console.log(grid.map(s => s.map(n => typeof n === 'number' ? n.toString(36) : n).join('')).join('\n'))
  // console.log(JSON.stringify(graph, null, 2));

  return graph;
}

function longestPath(graph, destination, { node: i = 0, dist = 0 } = {}, visited = new Set()) {
  if (i === destination) return dist;

  visited.add(i);

  const maxDistance = Math.max(
    ...graph[i].edges
      .filter(({ node }) => !visited.has(node))
      .map(edge => longestPath(graph, destination, edge, visited))
  );

  visited.delete(i);

  return dist + maxDistance;
}

function part2(input) {
  const graph = getGraph(input);
  const h = input.split('\n').length - 1;
  return longestPath(graph, graph.findIndex(({ r }) => r === h));
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
// test(part1, sampleInput, 94);
test(part2, sampleInput, 154);

const inputFile = 'inputs/2023/day-23.txt';
// exec(part1, inputFile); // => 2366
exec(part2, inputFile); // => 6682

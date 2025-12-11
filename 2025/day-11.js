#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  const graph = {};
  for (const l of input.split('\n')) {
    const [input, ...outputs] = l.matchAll(/\w+/g);
    graph[input] = outputs.map(m => m[0]);
  };

  return (function dfs(node) {
    if (node === 'you') return 0;
    if (node === 'out') return 1;
    return graph[node ?? 'you'].reduce((sum, n) => sum + dfs(n), 0);
  })();
}

function part2(input) {
  const graph = {}, visited = new Map();
  for (const l of input.split('\n')) {
    const [input, ...outputs] = l.matchAll(/\w+/g);
    graph[input] = outputs.map(m => m[0]);
  };

  return (function dfs(node, required = 0) {
    if (node === 'svr') return 0;
    if (node === 'out') return required === 2 ? 1 : 0;
    required += node === 'dac' || node === 'fft';

    const key = `${node}|${required}`;
    if (!visited.has(key)) visited.set(key, graph[node ?? 'svr'].reduce((sum, n) => sum + dfs(n, required), 0));
    return visited.get(key);
  })();
}

const inputFile = 'inputs/2025/day-11.txt';
const sampleInput = `
aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`.trim();

test(part1, sampleInput, 5);
exec(part1, inputFile);

const sampleInput2 = `
svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`.trim();

test(part2, sampleInput2, 2);
exec(part2, inputFile, 349322478796032);

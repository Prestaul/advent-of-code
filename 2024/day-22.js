#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function next(v) {
  v = (((v * 64) ^ v) >>> 0) % 16777216;
  v = (((v >>> 5) ^ v) >>> 0) % 16777216;
  v = (((v * 2048) ^ v) >>> 0) % 16777216;
  return v;
}

function part1(input) {
  return input.split('\n').map(Number).reduce((sum, v) => {
    for (let i = 2000; i--;) v = next(v);
    return sum + v;
  }, 0);
}

function part2(input) {
  const prices = input.split('\n').map(Number).map(v => {
    const prices = [v % 10];
    for (let i = 2000; i--;) prices.push((v = next(v)) % 10);
    return prices;
  });
  const diffs = prices.map(b => {
    const diffs = [];
    function insert(a, b) {
      if (a < b) diffs.push((a - b).toString());
      else diffs.push('+' + (a - b).toString());
    }
    for (let i = 1; i < b.length; i++) insert(b[i], b[i - 1]);
    return diffs.join('');
  });

  function find(i, seq) {
    const idx = diffs[i].indexOf(seq);
    if (idx === -1) return 0;
    return prices[i][idx/2 + 4];
  }

  const visited = new Map();
  for (let i = 0; i <= 3992; i += 2) {
    const seq = diffs[0].slice(i, i + 8);
    if (visited.has(seq)) continue;

    let bananas = prices[0][i / 2 + 4];
    for (let i = 1; i < diffs.length; i++) bananas += find(i, seq);

    visited.set(seq, bananas);
  }

  return Math.max(...visited.values());
}

const inputFile = 'inputs/2024/day-22.txt';

test(part1, `
1
10
100
2024`.trim(), 37327623);
exec(part1, inputFile, 20332089158);

test(part2, `
1
2
3
2024`.trim(), 23);
exec(part2, inputFile, 2191);

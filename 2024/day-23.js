#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  const pairs = input.split('\n').map(l => l.split('-'));
  const map = pairs.reduce((acc, [a, b]) => {
    (acc[a] ??= []).push(b);
    (acc[b] ??= []).push(a);
    return acc;
  }, {});

  const nodes = new Set(pairs.flat());
  const starts = [...nodes].filter(([n]) => n === 't');

  const sets = new Set();

  for (const t of starts) {
    const queue = [[t]];
    for (const [a, b, c] of queue) {
      if (c) {
        if (map[a].includes(t)) {
          sets.add([a, b, c].sort().join(','));
        }
        continue;
      }

      for (const n of map[a] ?? []) queue.push([n, a, b]);
    }
  }

  return sets.size;
}

function part2(input) {
  const pairs = input.split('\n').map(l => l.split('-'));
  const connected = [];
  const map = pairs.reduce((acc, [a, b]) => {
    (acc[a] ??= []).push(b);
    (acc[b] ??= []).push(a);
    connected.push(new Set([a, b]));
    return acc;
  }, {});

  for (const [a, b] of pairs) {
    for (const c of connected) {
      if (c.has(a)) {
        if (map[b].filter(d => c.has(d)).length === c.size) c.add(b);
      } else if (c.has(b)) {
        if (map[a].filter(d => c.has(d)).length === c.size) c.add(a);
      }
    }
  }

  return [...connected.sort((a, b) => b.size - a.size)[0]].sort().join(',');
}

const inputFile = 'inputs/2024/day-23.txt';
const sampleInput = `
kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`.trim();

test(part1, sampleInput, 7);
exec(part1, inputFile, 1253);

test(part2, sampleInput, 'co,de,ka,ta');
exec(part2, inputFile, 'ag,bt,cq,da,hp,hs,mi,pa,qd,qe,qi,ri,uq');

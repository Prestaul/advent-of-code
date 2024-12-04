#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function transpose(pattern, w) {
  const h = pattern.length / w;
  const out = [];
  for (let i = 0; i < pattern.length; i++) out.push(pattern[(i % h) * w + Math.floor(i / h)]);
  return out.join('');
}

function countBits(n) {
  let c = 0;
  do if (n & 1n) c++; while(n >>= 1n);
  return c;
}

function findMirror(pattern, w) {
  const bw = BigInt(w);
  const h = pattern.length / w;
  const rowMask = 2n ** bw - 1n;

  let top = BigInt('0b' + pattern);
  let bottom = 0n;
  for (let i = 1; i < h; i++) {
    bottom = (bottom << bw) | (top & rowMask);
    top >>= bw;

    const mask = 2n ** BigInt(w * Math.min(i, h - i)) - 1n;
    if (countBits((top ^ bottom) & mask) === 1) return h - i;
  }

  return 0;
}

function main(input) {
  return input.split('\n\n').map(pattern => {
    const w = pattern.indexOf('\n');
    pattern = pattern.replaceAll('#', '1').replaceAll('.', '0').replaceAll('\n', '');
    return findMirror(pattern, w) * 100 || findMirror(transpose(pattern, w), w);
  })
  .reduce((a, b) => a + b);
}

exec(main, 'inputs/2023/day-13.txt', 34536);

console.log(main(`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`)); // 400

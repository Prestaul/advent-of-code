#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function swap(pattern, w, h) {
  const out = [];
  for (let i = 0; i < pattern.length; i++) out.push(pattern[(i % h) * w + Math.floor(i / h)])
  return out.join('');
}

function findMirror(pattern, width, height) {
  const w = BigInt(width);
  const rowMask = 2n ** w - 1n;

  let top = BigInt('0b' + pattern);
  let bottom = 0n;
  for (let i = 1; i < height; i++) {
    bottom = (bottom << w) | (top & rowMask);
    top >>= w;

    const mask = 2n ** BigInt(width * Math.min(i, height - i)) - 1n;
    if (!((top ^ bottom) & mask)) return height - i;
  }
  return 0;
}

function main(input) {
  return input.split('\n\n').map(pattern => {
    const w = pattern.indexOf('\n');
    pattern = pattern.replaceAll('#', '1').replaceAll('.', '0').replaceAll('\n', '');
    const h = pattern.length / w;
    return findMirror(pattern, w, h) * 100 || findMirror(swap(pattern, w, h), h, w);
  })
  .reduce((a, b) => a + b);
}

exec(main, '2023/day-13-input'); // 32723

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
#....#..#`)); // 405

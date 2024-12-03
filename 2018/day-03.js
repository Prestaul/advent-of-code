#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function getOverlap([ca, ra, cma, rma], [cb, rb, cmb, rmb]) {
  if ((ca - cmb) * (cma - cb) < 0 && (ra - rmb) * (rma - rb) < 0)
    return [Math.max(ca, cb), Math.max(ra, rb), Math.min(cma, cmb), Math.min(rma, rmb)];
}

function getClaims(input) {
  return input.split('\n').map(s => {
    const [, id, c, r, w, h] = s.match(/^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/);
    return [+c, +r, +c + +w, +r + +h, +id];
  });
}

function part1(input) {
  const claims = getClaims(input);
  const overlap = new Set();
  for (let i = claims.length; i--;)
    for (let j = i; j--;) {
      const [r, c, rm, cm] = getOverlap(claims[i], claims[j]) ?? [0, 0, 0, 0];
      for (let x = c; x < cm; x++) for (let y = r; y < rm; y++) overlap.add(y * 1000 + x);
    }
  return overlap.size;
}

function part2(input) {
  const claims = getClaims(input);
  outer: for (let i = claims.length; i--;) {
    for (let j = claims.length; j--;)
      if(i !== j && getOverlap(claims[i], claims[j])) continue outer;
    return claims[i][4];
  }
}

const sampleInput = `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`;

test(part1, sampleInput, 5);
test(part2, sampleInput, 3);

const inputFile = 'inputs/2018/day-03.txt';
exec(part1, inputFile); // => 115304
exec(part2, inputFile); // => 275

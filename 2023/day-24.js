#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function parse(input) {
  return input.split('\n')
    .map(l => l.match(/-?\d+/g).map(Number))
    .map(([x, y, z, dx, dy, dz]) => ({ x, y, z, dx, dy, dz, t: 0 }));
}

function part1(input, min, max) {
  // y - y1 = m(x - x1)
  // 0 = mx - mx1 + y1 - y
  const lines = parse(input).map(({x, y, dx, dy}) => ({ x, y, dx, dy, a: dy/dx, b: -1, c: y - x * dy/dx }));

  let collisions = 0;
  for (let i = lines.length; i--;) for (let j = i; j--;) {
    const a = lines[i], b = lines[j];
    const x = (a.b * b.c - b.b * a.c) / (a.a * b.b - b.a * a.b);
    const y = (a.c * b.a - b.c * a.a) / (a.a * b.b - b.a * a.b);
    if (x >= min && x <= max && y >= min && y <= max && Math.sign(x - a.x) === Math.sign(a.dx) && Math.sign(x - b.x) === Math.sign(b.dx)) {
      collisions += 1;
      // console.log({ i, j, x, y })
    }
  }
  // xi = ((b1×c2 − b2×c1)/(a1×b2 − a2×b1)
  // yi = (c1×a2 − c2×a1)/(a1×b2 − a2×b1))
  return collisions;
}

function part2(input) {
  const particles = parse(input);
  // X + DX * t = x0 + dx0 * t            , y0 + dy * t, z0 + dz * t
  // x = x1 + dx1 * t            , y1 + dy * t, z1 + dz * t
  // x = x2 + dx2 * t            , y2 + dy * t, z2 + dz * t

  /*
t => [19 + -2 * t, 13 +  1 * t, 30 + -2 * t]
t => [18 + -1 * t, 19 + -1 * t, 22 + -2 * t]
t => [20 + -2 * t, 25 + -2 * t, 34 + -4 * t]
t => [12 + -1 * t, 31 + -2 * t, 28 + -1 * t]
t => [20 +  1 * t, 19 + -5 * t, 15 + -3 * t]

t => [12 + -1 * t, 31 + -2 * t, 28 + -1 * t]
t => [20 +  1 * t, 19 + -5 * t, 15 + -3 * t]


19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3

  */
}

const sampleInput = `
19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`.trim();
test(part1, sampleInput, 7, 27, 2);
// test(part2, sampleInput, 47); // x:24, y:13, z:10, dx:-3, dy:1, dz2

const inputFile = '2023/day-24-input';
exec(part1, inputFile, 200000000000000, 400000000000000); // => 11995
// exec(part2, inputFile); // =>

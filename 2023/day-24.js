#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';
import { Ceres } from '../Ceres-v1.5.3.js';

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

async function part2(input) {
  const particles = parse(input);
  const solver = new Ceres();

  let xSum = 0, ySum = 0, zSum = 0;
  particles.slice(0, 5).forEach((p, i) => {
    xSum += p.x;
    ySum += p.y;
    zSum += p.z;
    solver.add_function(([x, y, z, dx, dy, dz, ...t]) => p.x + p.dx * t[i] - x - dx * t[i]);
    solver.add_function(([x, y, z, dx, dy, dz, ...t]) => p.y + p.dy * t[i] - y - dy * t[i]);
    solver.add_function(([x, y, z, dx, dy, dz, ...t]) => p.z + p.dz * t[i] - z - dz * t[i]);
  });

  await solver.promise;

  // const guesses = [xSum / 3, ySum / 3, zSum / 3, 0, 0, 0, 0, 0, 0];
  const guesses = [461522278379729, 278970483473640, 243127954482382, -336, 29, 38, 631956804666, 447067527849, 98915323508, 172376561422, 208482411792, 0, 0, 0, 0];

  const solution = solver.solve(guesses, 10000);
  const [x, y, z] = solution.x.map(Math.round);
  console.log(solution.report);
  solver.remove(); // Some sort of cleanup?
  console.log('guesses:', guesses);
  console.log('x, y, z:', x, y, z);
  console.log('x + y + z:', x + y + z);

  // X + DX * t = x0 + dx0 * t            , y0 + dy * t, z0 + dz * t
  // x = x1 + dx1 * t            , y1 + dy * t, z1 + dz * t
  // x = x2 + dx2 * t            , y2 + dy * t, z2 + dz * t

  /*
x0 = 461522278373942.56
x1 = 278970483473397.47
x2 = 243127954481754.66
x3 = -335.99999995598705
x4 = 28.99999999841124
x5 = 38.00000000430607
x6 = 631956804746.983
x7 = 447067527880.3573
x8 = 98915323505.01337
x9 = 172376561426.3194
x10 = 208482411808.46683
x11 = 0
x12 = 0

f(t) => [19 + -2 * t, 13 +  1 * t, 30 + -2 * t]
f(t) => [18 + -1 * t, 19 + -1 * t, 22 + -2 * t]
f(t) => [20 + -2 * t, 25 + -2 * t, 34 + -4 * t]
f(t) => [12 + -1 * t, 31 + -2 * t, 28 + -1 * t]
f(t) => [20 +  1 * t, 19 + -5 * t, 15 + -3 * t]

x + (dx + 2) * t = 19

[x + dx * t - 19 +  2 * t, 13 +  1 * t, 30 + -2 * t]
[x + dx * t - 18 +  1 * t, 19 + -1 * t, 22 + -2 * t]
[x + dx * t - 20 +  2 * t, 25 + -2 * t, 34 + -4 * t]
[x + dx * t - 12 +  1 * t, 31 + -2 * t, 28 + -1 * t]
[x + dx * t - 20 + -1 * t, 19 + -5 * t, 15 + -3 * t]

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
// test(part1, sampleInput, 7, 27, 2);
// test(part2, sampleInput, 47); // x:24, y:13, z:10, dx:-3, dy:1, dz2

const inputFile = 'inputs/2023/day-24.txt';
// exec(part1, inputFile, 11995, 200000000000000, 400000000000000);
exec(part2, inputFile);

/*
=> LOW 847599595882771
x = 333915232744633.3
y = 283069811835176.7
z = 230614551302960.66

*/

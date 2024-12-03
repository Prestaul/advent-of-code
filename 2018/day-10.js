#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  let yMin = Number.POSITIVE_INFINITY, yMax = Number.NEGATIVE_INFINITY;
  const particles = input.split('\n').map(l => {
    const [x, y, dx, dy] = l.match(/-?\d+/g).map(Number);
    if (y < yMin) yMin = y;
    if (y > yMax) yMax = y;
    return { x, y, dx, dy };
  });
  console.log(particles);

  let i = 0;
  while(yMax - yMin > 16) {
    i++;
    yMin = Number.POSITIVE_INFINITY;
    yMax = Number.NEGATIVE_INFINITY;
    for(let p of particles) {
      p.x += p.dx;
      p.y += p.dy;
      if (p.y < yMin) yMin = p.y;
      if (p.y > yMax) yMax = p.y;
    }
  }

  let frames = 2;
  const xes = particles.map(p => p.x);
  const xMin = Math.min(...xes);
  const xMax = Math.max(...xes);
  while(frames--) {
    const g = Array(yMax - yMin + 1).fill().map(_ => Array(xMax - xMin + 1).fill(' '));
    const min = yMin;
    yMin = Number.POSITIVE_INFINITY;
    yMax = Number.NEGATIVE_INFINITY;
    for(let p of particles) {
      if (p.x >=0 )
        g[p.y - min][p.x - xMin] = 'X';

      p.x += p.dx;
      p.y += p.dy;
      if (p.y < yMin) yMin = p.y;
      if (p.y > yMax) yMax = p.y;
    }
    console.log(i++);
    console.log(g.map(s => s.join('')).join('\n') + '\n');
  }
}

function part2(input) {
  return input.split('\n').map(Number).reduce((a, b) => a + b);
}

const sampleInput = `
position=< 9,  1> velocity=< 0,  2>
position=< 7,  0> velocity=<-1,  0>
position=< 3, -2> velocity=<-1,  1>
position=< 6, 10> velocity=<-2, -1>
position=< 2, -4> velocity=< 2,  2>
position=<-6, 10> velocity=< 2, -2>
position=< 1,  8> velocity=< 1, -1>
position=< 1,  7> velocity=< 1,  0>
position=<-3, 11> velocity=< 1, -2>
position=< 7,  6> velocity=<-1, -1>
position=<-2,  3> velocity=< 1,  0>
position=<-4,  3> velocity=< 2,  0>
position=<10, -3> velocity=<-1,  1>
position=< 5, 11> velocity=< 1, -2>
position=< 4,  7> velocity=< 0, -1>
position=< 8, -2> velocity=< 0,  1>
position=<15,  0> velocity=<-2,  0>
position=< 1,  6> velocity=< 1,  0>
position=< 8,  9> velocity=< 0, -1>
position=< 3,  3> velocity=<-1,  1>
position=< 0,  5> velocity=< 0, -1>
position=<-2,  2> velocity=< 2,  0>
position=< 5, -2> velocity=< 1,  2>
position=< 1,  4> velocity=< 2,  1>
position=<-2,  7> velocity=< 2, -2>
position=< 3,  6> velocity=<-1, -1>
position=< 5,  0> velocity=< 1,  0>
position=<-6,  0> velocity=< 2,  0>
position=< 5,  9> velocity=< 1, -2>
position=<14,  7> velocity=<-2,  0>
position=<-3,  6> velocity=< 2, -1>`.trim();
test(part1, sampleInput, 'HI');
// test(part2, sampleInput, 123);

const inputFile = 'inputs/2018/day-10.txt';
exec(part1, inputFile); // =>
// exec(part2, inputFile); // =>

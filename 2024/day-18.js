#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input, { size, bytes }) {
  const blocks = new Set(input.split('\n').slice(0, bytes));

  const wave = [[0,0,0]];
  for (let [x, y, d] of wave) {
    if (x === size && y === size) return d;

    if (blocks.has(`${x},${y}`)) continue;
    blocks.add(`${x},${y}`);

    d += 1;
    if (x < size) wave.push([x+1, y, d]);
    if (x > 0) wave.push([x-1, y, d]);
    if (y < size) wave.push([x, y+1, d]);
    if (y > 0) wave.push([x, y-1, d]);
  }
}

function part2(input, { size }) {
  const lines = input.split('\n');
  let bytes = lines.length;
  while (bytes--)
    if(part1(input, { size, bytes }))
      return lines[bytes];
}

const inputFile = 'inputs/2024/day-18.txt';
const sampleInput = `
5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`.trim();

test(part1, sampleInput, 22, { size: 6, bytes: 12 });
exec(part1, inputFile, 310, { size: 70, bytes: 1024 });

test(part2, sampleInput, '6,1', { size: 6 });
exec(part2, inputFile, null, { size: 70 });

#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  const [a, b] = input.split('\n\n');
  const ranges = a.split('\n').map(line => {
    const [start, end] = line.split('-').map(Number);
    return { start, end };
  });
  const nums = b.split('\n').map(Number);

  let count = 0;
  for (const n of nums) {
    for (const { start, end } of ranges) {
      if (start <= n && n <= end) {
        count++;
        break;
      }
    }
  }

  return count;
}

function part2(input) {
  const a = input.split('\n\n')[0];
  const ranges = a.split('\n').map(line => line.split('-').map(Number));

  return ranges.sort(([r1], [r2]) => r1 - r2)
    .reduce((acc, range) => {
      const last = acc[acc.length - 1];
      if (!last || last[1] < range[0]) {
        acc.push(range);
      } else {
        last[1] = Math.max(last[1], range[1]);
      }
      return acc;
    }, [])
    .reduce((acc, [start, end]) => acc + end - start + 1, 0);
}

const inputFile = 'inputs/2025/day-05.txt';
const sampleInput = `
3-5
10-14
16-20
12-18

1
5
8
11
17
32`.trim();

test(part1, sampleInput, 3);
exec(part1, inputFile, 679);

test(part2, sampleInput, 14);
exec(part2, inputFile, 358155203664116);

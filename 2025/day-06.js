#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  const lines = input.split('\n');
  const ops = lines.pop().trim().split(/\s+/);
  const rows = lines.map(line => line.trim().split(/\s+/).map(Number));

  return ops.reduce((sum, op, i) => sum + rows.reduce((acc, val) => op === '*' ? acc * val[i] : acc + val[i], op === '*' ? 1 : 0), 0);
}

function part2(input) {
  const lines = input.split('\n');
  const ops = lines.pop().trim().split(/\s+/);

  let col = 0;
  const max = Math.max(...lines.map(l => l.length));

  return ops.reduce((sum, op) => {
    let result = op === '*' ? 1 : 0;

    while (col < max) {
      const digits = lines.map(line => line[col] ?? ' ');
      col++;
      if (digits.every(d => d === ' ')) break;
      const val = digits.reduce((v, d) => {
        if (d === ' ') return v;
        return v * 10 + Number(d);
      }, 0);
      result = op === '*' ? result * val : result + val;
    }

    return sum + result;
  }, 0);
}

const inputFile = 'inputs/2025/day-06.txt';
const sampleInput = `
123 328  51 64
 45 64  387 23
  6 98  215 314
*   +   *   +  `.trim();

test(part1, sampleInput, 4277556);
exec(part1, inputFile, 6343365546996);

test(part2, sampleInput, 3263827);
exec(part2, inputFile, 11136895955912);

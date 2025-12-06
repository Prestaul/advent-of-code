#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

const doOp = (op, terms) => op === '*' ? terms.reduce((a, b) => a * b, 1) : terms.reduce((a, b) => a + b, 0);

function part1(input) {
  const lines = input.split('\n');
  const ops = lines.pop().trim().split(/\s+/);
  const rows = lines.map(line => line.trim().split(/\s+/).map(Number));

  return ops.reduce((sum, op, i) => sum + doOp(op, rows.map(row => row[i])), 0);
}

function part2(input) {
  const lines = input.split('\n');
  const ops = lines.pop().trim().split(/\s+/);

  let col = 0;
  const max = Math.max(...lines.map(l => l.length));

  return ops.reduce((sum, op) => {
    const terms = [];

    while (col < max) {
      const digits = lines.map(line => line[col] ?? ' ');
      col++;

      if (digits.every(d => d === ' ')) break;

      terms.push(digits.reduce((v, d) => {
        if (d === ' ') return v;
        return v * 10 + Number(d);
      }, 0));
    }

    return sum + doOp(op, terms);
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

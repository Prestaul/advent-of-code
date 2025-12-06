#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

const doOp = (op, terms) => op === '*' ? terms.reduce((a, b) => a * (b || 1), 1) : terms.reduce((a, b) => a + (b || 0));

function part1(input) {
  const lines = input.split('\n');
  const ops = lines.pop().trim().split(/\s+/);
  const rows = lines.map(line => line.trim().split(/\s+/).map(Number));

  return ops.reduce((sum, op, i) => sum + doOp(op, rows.map(row => row[i])), 0);
}

function part2(input) {
  const lines = input.split('\n');
  const ops = lines.pop().trim().split(/\s+/);

  const terms = Array.from(
    { length: Math.max(...lines.map(l => l.length)) },
    (_, i) => parseInt(lines.map(line => line[i] ?? '').join('').trim(), 10)
  );

  // Terms is now an array of numbers split by NaN between operations

  return ops.reduce((sum, op) => sum + doOp(op, terms.splice(0, (terms.findIndex(t => isNaN(t)) + 1) || 9999)), 0);
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

#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h + s.charCodeAt(i)) * 17 % 256;
  return h;
}

function part1(input) {
  return input.split(',').map(hash).reduce((a, b) => a + b);
}

function part2(input) {
  const boxes = Array(256);

  for (let s of input.split(',')) {
    const [, label, op, focus] = s.match(/^(.+)(\D)(\d)?$/);
    const box = boxes[hash(label)] ??= {};
    if (op === '=') box[label] = +focus;
    else delete box[label];
  }

  return boxes.map((box, i) => Object.values(box).map((focus, j) => (i + 1) * (j + 1) * focus)).flat().reduce((a, b) => a + b);
}

const sampleInput = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;
test(part1, sampleInput, 1320);
test(part2, sampleInput, 145);

const inputFile = 'inputs/2023/day-15.txt'
exec(part1, inputFile, 501680);
exec(part2, inputFile, 241094);

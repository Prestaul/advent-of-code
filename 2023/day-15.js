#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function hash(s, limit = null) {
  let h = 0;
  for (let i = 0; i < (limit ?? s.length); i++) h = (h + s.charCodeAt(i)) * 17 % 256;
  return h;
}

function part1(input) {
  return input.split(',').map(hash).reduce((a, b) => a + b);
}

function part2(input) {
  const boxes = new Array(256);

  input.split(',').forEach(s => {
    const op = s.at(-1) === '-' ? '-' : '=';
    const label = s.substring(0, s.length - (op === '-' ? 1 : 2));
    const num = hash(label);
    const box = boxes[num] ??= [];

    if (op === '=') {
      const focus = Number(s.at(-1));
      const lens = box.find(l => l.label === label);
      if (lens) {
        lens.focus = focus;
      } else {
        box.push({ label, focus });
      }
    } else {
      boxes[num] = box.filter(l => l.label !== label);
    }
  });

  return boxes.map((box, i) => box.map(({ focus }, j) => (i + 1) * (j + 1) * focus)).flat().reduce((a, b) => a + b);
}

exec(part1, '2023/day-15-input'); // 501680
exec(part2, '2023/day-15-input'); // 241094

console.log(part2(`rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`)); // 145

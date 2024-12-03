#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function parseBinary(s) {
  return Number('0b' + s);
}

function charCount(s, char) {
  return s.split(char).length - 1;
}

// TODO: Currently returns incorrect value for my input but works on example input
function main(prog) {
  const lines = prog.split('\n');
  const mem = [];
  let sMask = '';
  let cnt = 0;
  let cmb = 0;
  let bMask1 = 0;
  let bMask2 = 0;
  let digits = [];

  for(let i = 0; i < 1024; i++) digits[i] = i.toString(2).padStart(36, '0');

  lines.forEach(line => {
    const [op, val] = line.split(/\s*=\s*/);

    if (op === 'mask') {
      sMask = '0b' + val.replaceAll('1', '0');
      bMask2 = val.replaceAll('X', '0');
      bMask1 = parseBinary(bMask2.replaceAll('0', '1'));
      bMask2 = parseBinary(bMask2);
      cnt = charCount(sMask, 'X');
      cmb = Math.pow(2, cnt);
    } else {
      const v = BigInt(val);
      const a = (parseInt(op.substring(4), 10) & bMask1) | bMask2;

      // console.log(Number(op.match(/\d+/)[0]), bMask1, bMask2, a);
      mem[a] = v;
      // console.log(op, a)
      for(let i = 1; i < cmb; i++) {
        const d = digits[i];
        let j = 36 - cnt;
        // console.log(sMask.replaceAll('X', () => d[j++]));
        // j = 36 - cnt;
        const addr = a ^ Number(sMask.replaceAll('X', () => d[j++]));
        mem[addr] = v;
      }
    }
  });

  // console.log(mem);

  return mem.reduce((a, b) => a + b, 0n);
}

exec(main, 'inputs/2020/day-14.txt');

#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1({ A, program }) {
  let out = [];
  let B = 0n, C = 0n;
  while(A !== 0n) {
    B = A & 7n;  // Read 3 bits (0,1,2,3,4,5,6,7)
    B = B ^ 5n;  // Randomize B (5,4,7,6,1,0,3,2)
    C = A >> B; // C from A
    B = B ^ 6n;  // Randomize B (3,2,1,0,7,6,5,4)
    B = B ^ C;  // New initial B (0 - 7)
    out.push(B & 7n); // 5, 5
    A = A >> 3n; // Reduce A
  } // 3, 0
  return out;

  // 0 ^ 5 = 5   5 ^ 6 = 3
  // 1 ^ 5 = 4   4 ^ 6 = 2
  // 2 ^ 5 = 7   7 ^ 6 = 1
  // 3 ^ 5 = 6   6 ^ 6 = 0
  // 4 ^ 5 = 1   1 ^ 6 = 7
  // 5 ^ 5 = 0   0 ^ 6 = 6
  // 6 ^ 5 = 3   3 ^ 6 = 5
  // 7 ^ 5 = 2   2 ^ 6 = 4

  // // let B = 0, C = 0;
  // let i = 0;
  // const out = [];

  // function op() {
  //   return program[i++];
  // }
  // function comboOp() {
  //   const x = op();
  //   if (x === 4) return A;
  //   if (x === 5) return B;
  //   if (x === 6) return C;
  //   return x;
  // }

  // while (i < program.length && out.length < 18) {
  //   switch (program[i++]) {
  //     case 0:
  //       A  = A >> comboOp();
  //       break;
  //     case 1:
  //       B = B ^ op();
  //       break;
  //     case 2:
  //       B = comboOp() & 7;
  //       break;
  //     case 3:
  //       i = A === 0 ? i + 1 : op();
  //       break;
  //     case 4:
  //       B = B ^ C;
  //       i++;
  //       break;
  //     case 5:
  //       const next = comboOp() & 7;
  //       // if (next !== program[out.length]) return 0;
  //       out.push(next);
  //       if (out.length > 11) console.log(out.join(','), { A, B, C });
  //       break;
  //     case 6:
  //       B = A >> comboOp();
  //       break;
  //     case 7:
  //       C = A >> comboOp();
  //       break;
  //   }
  //   // console.log(out.join(','), { l: out.length, A, B, C });
  // }

  // return out.join(',');
}

function part2({ min, max, A, inc, program }) {
  const out = program.join(' ');
  let p, ps, pl;
  // for (let A = parseInt(program.toReversed().join(''), 8); A < 119_135_517_790_999; A++) {
  // for (let A = 119_135_517_566_278; A < 120_000_000_000_000; A++) {
  // for (let A = 14_891_939_723_870; A < 119_135_517_790_992; A += 1) {
  // const min = 35_135_517_566_278, max = min + 10;
  // const min = 119_135_517_790_992, max = min + 10;
  // for (let A = min; A < max; A++) {
  for (let max = A + inc * 8n; A < max; A += inc) {
    p = part1({ A, program });
    if (p === 0) continue;

    ps = p.join(' ');
    pl = p.length;
    console.log(A.toString(8), ps, pl) //, parseInt(p.toReversed().join(''), 8));
    if (ps === out) {
      console.log('SOLUTION', A);
      return ps;
    }
  }
  console.log('                 2 4 1 5 7 5 1 6 4 1 5 5 0 3 3 0')
  // console.log('DONE', A, ps, pl, l) //, parseInt(p.toReversed().join(''), 8));
}

const inputFile = 'inputs/2024/day-17.txt';
const sampleInput = `
Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`.trim();

// test(part1, {
//   A: 729,
//   program: [0,1,5,4,3,0]
// }, '4,6,3,5,6,3,5,2,1,0');
test(part2, {
  // A: 60589763n,
  A: 0o347103303n,
  A: 14_891_939_723_870n * 8n,
  A: 119135517790992n + 1n * 11_218_889_000_000n,
  // 130355377995777n
  A: 0o3550727200000001n,
  inc: 0o10000000n,

  A: 0o3100000000000000n,
  inc: 0o10000000000000n,

  A: 0o3033046334720000n,
  inc: 0o1000n,

  A: 0o3033046334424630n,
  inc: 0o1n,

  // A: 0o330551461575136,
  // A: 0o7000074615751420,
  // A: 60589763 * 8 ** 6,
  program: [2,4n,1,5n,7,5n,1,6n,4,1n,5,5n,0,3n,3,0n]
}, '2 4 1 5 7 5 1 6 4 1 5 5 0 3 3 0');
// }, '3,5,0,1,5,1,5,1,0');
// exec(part1, inputFile);
// 2,4,1,5,7,5,1,6,4,1,5,5,0,3,3,0

// test(part2, {
//   min: 1,
//   max: 1000000,
//   program: [0,3,5,4,3,0]
// }, 117440);
// test(part2, {
//   min: 14_891_939_723_870,
//   max: 119_135_517_790_992,
//   program: [
//     2,4,1,5,7,5,1,6,4,1,5,5,0,3,3,0]
// }, '2,4,1,5,7,5,1,6,4,1,5,5,0,3,3,0');
// exec(part2, inputFile);
//  LOW 14_891_939_723_870
// HIGH 119_135_517_790_992
// 953084118110144 + 6386855


// while(A !== 0) {
//   B = A & 7;  // 2, 4
//   B = B ^ 5;  // 1, 5
//   C = A >> B; // 7, 5
//   B = B ^ 6;  // 1, 6
//   B = B ^ C;  // 4, 1
//   out.push(B & 7); // 5, 5
//   A = A >> 3; // 0, 3
// } // 3, 0

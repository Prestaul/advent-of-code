#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';
import { memoize } from '../helpers/memoize.js';

const keyPad = {
           0:[1,3], A:[2,3],
  1:[0,2], 2:[1,2], 3:[2,2],
  4:[0,1], 5:[1,1], 6:[2,1],
  7:[0,0], 8:[1,0], 9:[2,0],
};

const dirPad = {
             '^':[1,0], 'A':[2,0],
  '<':[0,1], 'v':[1,1], '>':[2,1],
};

function solve(input, limit) {
  const encode = getEncoder();
  return input.split('\n').reduce((sum, code) => sum + parseInt(code, 10) * encode(code, limit), 0);
}

function getEncoder() {
  const encode = memoize(function (sequence, d, pad = keyPad) {
    let prev = 'A';
    return sequence.split('').reduce((len, key) => {
      // console.log({ key, prev, sequence, d, pad });
      const [x, y] = pad[prev];
      const [kx, ky] = pad[key];
      const dx = kx - x, dy = ky - y;
      // console.log({ x, y, kx, ky, dx, dy });
      prev = key;

      if (d === 0) return len + Math.abs(dx) + Math.abs(dy) + 1;

      const xseq = (dx > 0 ? '>' : '<').repeat(Math.abs(dx));
      const yseq = (dy > 0 ? 'v' : '^').repeat(Math.abs(dy));

      const nextA = encode(xseq + yseq + 'A', d - 1, dirPad);
      if (dx === 0 || dy === 0 || (pad === keyPad && x === 0 && ky === 3)) return len + nextA;

      const nextB = encode(yseq + xseq + 'A', d - 1, dirPad);
      if (pad === keyPad && kx === 0 && y === 3) return len + nextB;
      return len + (nextA < nextB ? nextA : nextB);
    }, 0);
  }, (s, d) => `${s},${d}`);
  return encode;
}

const inputFile = 'inputs/2024/day-21.txt';
const sampleInput = `
029A
980A
179A
456A
379A`.trim();

test(solve, '029A', 68 * 29, 2);
test(solve, '980A', 60 * 980, 2);
test(solve, '179A', 68 * 179, 2);
test(solve, '456A', 64 * 456, 2);
test(solve, '379A', 64 * 379, 2);
test(solve, sampleInput, 126384, 2);
exec(solve, inputFile, 137870, 2);

// test(solve, '029A', 68 * 29, 25);
// test(solve, sampleInput, 123, 25);
exec(solve, inputFile, null, 25);
// LOW 103619861701390

/*
029A: <vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A
980A: <v<A>>^AAAvA^A<vA<AA>>^AvAA<^A>A<v<A>A>^AAAvA<^A>A<vA>^A<A>A
179A: <v<A>>^A<vA<A>>^AAvAA<^A>A<v<A>>^AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A
456A: <v<A>>^AA<vA<A>>^AAvAA<^A>A<vA>^A<A>A<vA>^A<A>A<v<A>A>^AAvA<^A>A
379A: <v<A>>^AvA^A<vA<AA>>^AAvA<^A>AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A

+---+---+---+
| 7 | 8 | 9 |
+---+---+---+
| 4 | 5 | 6 |
+---+---+---+
| 1 | 2 | 3 |
+---+---+---+
    | 0 | A |
    +---+---+

    +---+---+
    | ^ | A |
+---+---+---+
| < | v | > |
+---+---+---+
           3                          7          9                 A
       ^   A       ^^        <<       A     >>   A        vvv      A
   <   A > A   <   AA  v <   AA >>  ^ A  v  AA ^ A  v <   AAA >  ^ A
v<<A>>^AvA^Av<<A>>^AAv<A<A>>^AAvAA<^A>Av<A>^AA<A>Av<A<A>>^AAAvA<^A>A

           3                      7          9                 A
       ^   A         <<      ^^   A     >>   A        vvv      A
   <   A > A  v <<   AA >  ^ AA > A  v  AA ^ A   < v  AAA >  ^ A
<v<A>>^AvA^A<vA<AA>>^AAvA<^A>AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A
            <<vAA>A>^AAvA<^A>AAAvA^A
            <<vAA>A>^AAvA<^A>AAvA^A

                      7
         <<      ^^   A
  v <<   AA ^  > AA > A
v<A<AA^>>AA<Av>A^AAvA^A
*/

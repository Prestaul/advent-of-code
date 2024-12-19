#!/usr/bin/env node
import { test } from '../helpers/exec.js';

function runScript({ A, program }) {
  let B = 0, C = 0;
  let i = 0;
  const out = [];

  function next() {
    return program[i++];
  }
  function nextVal() {
    const x = next();
    if (x === 4) return A;
    if (x === 5) return B;
    if (x === 6) return C;
    return x;
  }

  while (i < program.length && out.length < 18) {
    switch (next()) {
      case 0:
        A  = A >> nextVal();
        break;
      case 1:
        B = B ^ next();
        break;
      case 2:
        B = nextVal() & 7;
        break;
      case 3:
        i = A === 0 ? i + 1 : next();
        break;
      case 4:
        B = B ^ C;
        i++;
        break;
      case 5:
        out.push(nextVal() & 7);
        break;
      case 6:
        B = A >> nextVal();
        break;
      case 7:
        C = A >> nextVal();
        break;
    }
  }

  return out;
}

function runCompiled(A) {
  let B = 0, C = 0;
  let out = [];
  while(A !== 0) {
    B = A & 7;  // Read 3 bits (0,1,2,3,4,5,6,7)
    B = B ^ 5;  // Randomize B (5,4,7,6,1,0,3,2)
    C = A >> B; // C from A
    B = B ^ 6;  // Randomize B (3,2,1,0,7,6,5,4)
    B = B ^ C;  // New initial B (0 - 7)
    out.push(B & 7); // 5, 5
    A = Math.trunc(A  / 8); // Reduce A
  } // 3, 0
  return out;
}


function part2(expected, n, A = 0) {
  // Start at the end
  n ??= expected.length - 1;

  // Increment through all possible octal digits in a single position
  // Numbers look like nonsense in decimal, but in octal it's easy to see
  const inc = 8 ** n;
  for (let i = 0; i < 8; i++)
    if (runCompiled(A + i * inc)[n] === expected[n]) {
      // Found it!
      if (n === 0) return A + i * inc;

      // Look for the next digit
      const res = part2(expected, n - 1, A + i * inc);
      if (res) return res;
    }
}

test(runScript, {
  A: 729,
  program: [0,1,5,4,3,0]
}, '4,6,3,5,6,3,5,2,1,0');
test(part2, [2,4,1,5,7,5,1,6,4,1,5,5,0,3,3,0], 107413700225434);
test(
  runCompiled,
  107413700225434, // octal 3033046334424632,
  '2,4,1,5,7,5,1,6,4,1,5,5,0,3,3,0'
);

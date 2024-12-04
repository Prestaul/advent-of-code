#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function main(input) {
  const w  = input.indexOf('\n') + 1;
  let i, j, pi, pj = i = j = pi = input.indexOf('S') ;


  if (i % w && '-FL'.includes(input[i - 1])) i -= 1;
  else if (i > w && '7|F'.includes(input[i - w])) i -= w;
  else if (i % w < w - 2 && 'J-7'.includes(input[i + 1])) i += 1;
  else i += w;

  if (j + w < input.length && 'J|L'.includes(input[j + w])) j += w;
  else if (j % w < w - 2 && 'J-7'.includes(input[j + 1])) j += 1;
  else if (j > w && '7|F'.includes(input[j - w])) j -= w;
  else j -= 1;

  const next = (p, c) => {
    switch(input[c]) {
      case '|': return c + (p < c ? w : -w);
      case '-': return c + (p < c ? 1 : -1);
      case 'L': return c + (p < c ? 1 : -w);
      case 'J': return c + (p === c - 1 ? -w : -1);
      case '7': return c + (p < c ? w : -1);
      case 'F': return c + (p === c + 1 ? w : 1);
    }
}

  let d = 1;
  while (i !== j && i !== pj) {
    [i, pi] = [next(pi, i), i];
    [j, pj] = [next(pj, j), j];
    d += 1;
  }

  return d;
}

exec(main, 'inputs/2023/day-10.txt', 6820);

console.log(main(`-L|F7
7S-7|
L|7||
-L-J|
L|-JF`)); // 4

console.log(main(`7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`)); // 8

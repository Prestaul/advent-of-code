#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

const next = {
  N: { '|':'N', '7':'W', 'F':'E' },
  S: { '|':'S', 'J':'W', 'L':'E' },
  E: { '-':'E', 'J':'N', '7':'S' },
  W: { '-':'W', 'L':'N', 'F':'S' },
};

function part1(input) {
  const w  = input.indexOf('\n');
  const re = new RegExp(`[^NSEW](?=.{${w}}(N))|(?<=(S).{${w}})[^NSEW]|(?<=(E))[^NSEW]|[^NSEW](?=(W))`, 's');
  let steps = 0;
  let dirMap = input, lastMap;
  while(dirMap !== lastMap) {
    steps += 1;
    [dirMap, lastMap] = [dirMap.replace(re, (p, N, S, E, W) => next[S ?? N ?? E ?? W][p]), dirMap];
  }

  return Math.floor(steps / 2);
}

// exec(main, 'inputs/2023/day-10.txt', 6820);

test(part1, `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`, 4);

test(part1, `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`, 8);

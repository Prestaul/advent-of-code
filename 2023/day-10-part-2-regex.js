#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part2(input, startPipe) {
  input = input.replace('S', startPipe);
  const w  = input.indexOf('\n')
  const disconnectedPipes = new RegExp(`[7|F](?!.{${w}}[J|L])|(?<![7|F].{${w}})[J|L]|(?<![L\\-F])[J\\-7]|[L\\-F](?![J\\-7])`, 'gs');

  let prev;
  while(input !== prev) [input, prev] = [input.replace(disconnectedPipes, '.'), input];

  return input
    .replaceAll(/^\.+|L-*J|F-*7|\.+$/gm, '') // Remove corners and edges that turn back on themselves and remove dots outside the path
    .replaceAll(/F-*J|L-*7/g, '|') // Replace corners and edges that pass through the line with a single pipe
    .replaceAll(/\|\|/g, '') // Remove any pairs of pipes leaving one for odd groups and none for even sized groups
    .match(/\|\.+\|/g) // Gather every other group of dots (and surrounding pipes)
    ?.reduce((l, s) => l + s.length - 2, 0) ?? 0; // Count 'em
}

test(part2, `
...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`.trim(), 'F', 4);

test(part2, `
.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
.|..F-J..F7FJ|L7L7L7
.L7.L7.F7||L7|.L7L7|
F-J..|FJLJ|FJ|F7|.LJ
-F..FJL-7.||.||||...
....L---J.LJ.LJLJ...`.trim(), 'F', 8);

const inputFile = 'inputs/2023/day-10.txt';
exec(part2, inputFile, 337, '|');

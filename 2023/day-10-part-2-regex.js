#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

const next = {
  N: { '|':'N', '7':'W', 'F':'E' },
  S: { '|':'S', 'J':'W', 'L':'E' },
  E: { '-':'E', 'J':'N', '7':'S' },
  W: { '-':'W', 'L':'N', 'F':'S' },
};

function getCleanMap(input, startPipe) {
  const w  = input.indexOf('\n');
  const re = new RegExp(`[^NSEW](?=.{${w}}(N))|(?<=(S).{${w}})[^NSEW]|(?<=(E))[^NSEW]|[^NSEW](?=(W))`, 's');

  let dirMap = input, lastMap;
  while(dirMap !== lastMap) [dirMap, lastMap] = [dirMap.replace(re, (p, N, S, E, W) => next[S ?? N ?? E ?? W][p]), dirMap];

  return dirMap.replaceAll(/[^NSEW.\n]/g, '.').replaceAll(/[NSEW]/g, (_, i) => input[i].replace('S', startPipe));
}

function main(input, startPipe) {
  return getCleanMap(input, startPipe).split('\n').map(row => {
    return row
      .replaceAll(/^\.+|L-*J|F-*7|\.+$/g, '')
      .replaceAll(/F-*J|L-*7/g, '|')
      .replaceAll(/\|\|/g, '')
      .match(/\|\.+\|/g)
      ?.reduce((l, s) => l + s.length - 2, 0) ?? 0;
      // .replaceAll(/^\.+||\.+$/g, '');
  }).reduce((a, b) => a + b);
}

exec(main, '2023/day-10-input', '|'); // 337

console.log(main(`...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`, 'F')); // 4

console.log(main(`.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`, 'F')); // 8

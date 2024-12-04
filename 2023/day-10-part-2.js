#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function next(d, p) {
  switch(p) {
    case '|':
    case '-': return d;
    case 'L': return d === 'S' ? 'E' : 'N';
    case 'J': return d === 'S' ? 'W' : 'N';
    case '7': return d === 'N' ? 'W' : 'S';
    case 'F': return d === 'N' ? 'E' : 'S';
  }
}

function main(input) {
  const g = input.split('\n').map(l => l.split(''));
  const w  = g[0].length;
  let x = input.indexOf('S');
  let y = Math.floor(x / (w + 1));
  x = x % (w + 1);

  let d = 'S';
  do {
    g[y][x] = d;
    if (d === 'N') y -= 1;
    if (d === 'S') y += 1;
    if (d === 'E') x += 1;
    if (d === 'W') x -= 1;
    d = next(d, g[y][x]);
  } while(g[y][x] !== 'S')

  let c = 0;
  let eo = 0;
  let yLast = '';
  for (let y = 0; y < g.length; y++) {
    switch(g[y][0]) {
      case 'E': if (yLast !== 'E') eo -= 1; break;
      case 'W': if (yLast !== 'W') eo += 1; break;
    }

    let reo = eo;
    let rLast = '';

    switch(g[y][0]) {
      case 'E':
        if (g[y - 1][0] === 'S') rLast = 'S'; else
        if (g[y + 1][0] === 'N') rLast = 'N';
        break;
      case 'N': rLast = 'N'; break;
      case 'S': rLast = 'S'; break;
    }

    for (let x = 1; x < w; x++) {
      switch(g[y][x]) {
        case 'N': if (rLast !== 'N') { reo -= 1; rLast = 'N'; } break;
        case 'S': if (rLast !== 'S') { reo += 1; rLast = 'S'; } break;
        case 'W':
        case 'E':
          if (rLast !== 'N' && g[y + 1]?.[x] === 'N') { reo -= 1; rLast = 'N'; } else
          if (rLast !== 'S' && g[y - 1]?.[x] === 'S') { reo += 1; rLast = 'S'; }
          break;
        default:
          rLast = '';
          if (reo) {
            g[y][x] = '*'
            c += 1;
          }
      }

      switch(g[y][0]) {
        case 'E':
        case 'W':
          break;
        case 'N':
        case 'S':
          if (yLast !== 'E' && g[y]?.[-1] === 'E') { eo -= 1; yLast = 'E'; } else
          if (yLast !== 'W' && g[y]?.[ 1] === 'W') { eo += 1; yLast = 'W'; }
          break;
        default:
          yLast = '';
      }
    }
  }

  // console.log(g.map(l => l.join('')).join('\n').replaceAll(/[^NSEW*\n]/g, ' '));

  return c;
}

exec(main, 'inputs/2023/day-10.txt', 337);

console.log(main(`...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`)); // 4

console.log(main(`.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`)); // 8

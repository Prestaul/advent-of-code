#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function expand(input) {
  const rows = input.replaceAll(/^\.+$/gm, x => `${x}\n${x}`).split('\n');

  let i = rows[0].length;
  column: while(i--) {
    for (let r of rows) {
      if (r[i] !== '.') continue column;
    }
    let j = rows.length;
    while(j--) rows[j] = rows[j].substring(0, i) + '.' + rows[j].substring(i);
  }

  return rows.join('\n');
}

function dist(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function main(input) {
  const map = expand(input);
  const w = map.indexOf('\n') + 1;
  const galaxies = [];

  let i = -1;
  while(true) {
    i = map.indexOf('#', i + 1);
    if (i < 0) break;
    galaxies.push({ x: i % w, y: Math.floor(i / w) });
  }

  let d = 0;
  let a = galaxies.length;
  while(a--) {
    let b = a;
    while(b--) d += dist(galaxies[a], galaxies[b]);
  }

  return d;
}

exec(main, '2023/day-11-input.txt'); // 9734203

console.log(main(`...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`)); // 374

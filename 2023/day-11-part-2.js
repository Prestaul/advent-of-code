#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function main(input, expansion = 999999) {
  const w = input.indexOf('\n') + 1;
  const rows = input.split('\n');

  const emptyRows = [];
  let i = rows.length;
  while(i--) if (/^\.+$/.test(rows[i])) emptyRows.push(i);

  const emptyCols = [];
  i = rows[0].length;
  column: while(i--) {
    for (let r of rows) {
      if (r[i] !== '.') continue column;
    }
    emptyCols.push(i);
  }

  const galaxies = [];
  i = -1;
  while(true) {
    i = input.indexOf('#', i + 1);
    if (i < 0) break;
    galaxies.push({ x: i % w, y: Math.floor(i / w) });
  }

  let d = 0;
  let a = galaxies.length;
  while(a--) {
    const ga = galaxies[a];
    let b = a;
    while(b--) {
      const gb = galaxies[b];
      const maxX = Math.max(ga.x, gb.x);
      const minX = Math.min(ga.x, gb.x);
      const maxY = Math.max(ga.y, gb.y);
      const minY = Math.min(ga.y, gb.y);
      d += maxX - minX + maxY - minY + emptyRows.filter(y => y > minY && y < maxY).length * expansion + emptyCols.filter(x => x > minX && x < maxX).length * expansion;
    };
  }

  return d;
}

exec(main, 'inputs/2023/day-11.txt'); // 568914596391

console.log(main(`...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`, 99)); // 8410

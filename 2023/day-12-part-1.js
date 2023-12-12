#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

const sum = (a, b) => a + b;

function count(s, [v, ...groups]) {
  let i = s.length - groups.reduce(sum, 0) - groups.length - v;
  let c = 0;
  outer: do {
    const f = s.indexOf('#');
    if ((f >= 0 && f < i) || s[i + v] === '#') continue outer;
    let j = v;
    while(j--) if (s[i + j] === '.') continue outer;
    const rest = s.substring(i + v + 1);
    c += groups.length ? count(rest, groups) : rest.includes('#') ? 0 : 1;
  } while (i--)
  return c;
}

function main(input) {
  return input.split('\n').map(l => {
    let [springs, s] = l.split(' ');
    const good = s.split(',').map(Number);

    while (/^\.*#/.test(springs)) {
      const len = good.shift();
      springs = springs.substring(springs.indexOf('#') + len + 1);
    }

    while (/#\.*$/.test(springs)) {
      const len = good.pop();
      springs = springs.substring(0, springs.lastIndexOf('#') - len);
    }

    springs = springs.replaceAll(/^\.+|\.+$/g, '').replaceAll(/\.{2,}/g, '.');

    return count(springs, good);
  }).reduce(sum, 0);
}

exec(main, '2023/day-12-input'); // 7506

console.log(main(`???.### 1,1,3
.??..??...?##. 1,1,3
.#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`)); // 21

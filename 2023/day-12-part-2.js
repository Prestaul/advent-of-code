#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

const sum = (a, b) => a + b;

function count(s, [v, ...groups], cache = {}) {
  const numGroups = groups.length;
  cache[s] ??= {};
  if (cache[s][numGroups]) return cache[s][numGroups];

  let i = s.length - groups.reduce(sum, 0) - numGroups - v;
  let c = 0;
  outer: do {
    const f = s.indexOf('#');
    if ((f >= 0 && f < i) || s[i + v] === '#') continue outer;
    let j = v;
    while(j--) if (s[i + j] === '.') continue outer;
    const rest = s.substring(i + v + 1);
    c += numGroups ? count(rest, groups, cache) : rest.includes('#') ? 0 : 1;
  } while (i--)

  return cache[s][numGroups] = c;
}

function main(input) {
  return input.split('\n').map((l, i) => {
    let [springs, s] = l.split(' ');
    let good = s.split(',').map(Number);

    springs = [springs, springs, springs, springs, springs].join('?');
    good = [...good, ...good, ...good, ...good, ...good];

    while (/^\.*#/.test(springs)) {
      const len = good.shift();
      springs = springs.substring(springs.indexOf('#') + len + 1);
    }

    while (/#\.*$/.test(springs)) {
      const len = good.pop();
      springs = springs.substring(0, springs.lastIndexOf('#') - len);
    }

    springs = springs.replaceAll(/^\.+|\.+$/g, '').replaceAll(/\.{2,}/g, '.');

    const c = count(springs, good);
    console.log(i, c);
    return c;

    // console.log(i, springs, good);
    // const a = count(springs, [...good]);
    // const b = count(springs + '?' + springs, [...good, ...good]);
    // if (a === b) return a;
    // const c = count('?' + springs, [...good]);
    // const d = count(springs + '?', [...good]);
    // return Math.max(c, d)**4 * Math.min(c, d);
  })
  .reduce(sum, 0);
}

exec(main, '2023/day-12-input'); // 548241300348335

console.time();
// console.log(main(`??????.???? 1,1`)); // 525152
console.log('TOTAL:', main(`???.### 1,1,3
.??..??...?##. 1,1,3
.#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`)); // 525152
console.timeEnd();

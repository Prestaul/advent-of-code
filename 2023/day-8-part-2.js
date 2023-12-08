#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function main(input) {
  const [path, ...lines] = input.split(/\n+/g);

  const tree = lines.reduce((t, l) => {
    t[l.substring(0, 3)] = {L: l.substring(7, 10), R: l.substring(12, 15)};
    return t;
  }, {});

  let n = input.match(/^..A/mg);

  const [s, ...ps] = n.map(k => {
    let s = 0;
    while(k[2] !== 'Z') k = tree[k][path[s++ % path.length]];
    return s;
  });

  let i = s;
  while (ps.some(p => i % p)) i += s;

  return i;
}

exec(main, '2023/day-8-input');
// 13740108158591

console.log(main(`LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`));

console.log(main(`LR

11A = (11B, XXX)
11B = (XXX, 11C)
11C = (11D, XXX)
11D = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22C, XXX)
22B = (22C, 22C)
22C = (22D, 22D)
22D = (22E, 22E)
22E = (22Z, 22Z)
22Z = (YYY, YYY)
YYY = (XXX, XXX)
XXX = (22C, 22C)`));






/*
A A
B B
C Z
D B
E Z
Z B
Y Z
X B
C Z
D B
E Z
Z B
*/

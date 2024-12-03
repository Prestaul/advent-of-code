#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

const gcd = (a, b) => a ? gcd(b % a, a): b;
const lcm = (a, b) => a * b / gcd(a, b);

function main(s) {
  let l = s.indexOf('\n');
  return s.match(/^..A/mg).map(n => Array(99999).findIndex((_, i) => 'Z' == (n = s.substr(s.indexOf(n + ' ') + 7 + 5 * (s[i % l] == 'R'), 3))[2]) + 1).reduce(lcm);
}

// First golf
// function main(input) {
//   const [path, tree] = input.split('\n\n');

//   return input.match(/^..A/mg).map(n => {
//     let i = 0;
//     while(n[2] !== 'Z')
//       n = tree.substr(tree.indexOf(n + ' ') + 7 + 5 * (path[i++ % path.length] == 'R'), 3);
//     return i;
//   }).reduce(lcm);
// }

// Original solution
// function main(input) {
//   const [path, ...lines] = input.split(/\n+/g);

//   const tree = lines.reduce((t, l) => {
//     t[l.substring(0, 3)] = {L: l.substring(7, 10), R: l.substring(12, 15)};
//     return t;
//   }, {});

//   let n = input.match(/^..A/mg);

//   return n.map(k => {
//     let s = 0;
//     while(k[2] !== 'Z') k = tree[k][path[s++ % path.length]];
//     return s;
//   }).reduce(lcm);
// }

exec(main, '2023/day-08-input.txt'); // 13740108158591

console.log(main(`LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`)); // 6

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
XXX = (22C, 22C)`)); // 4

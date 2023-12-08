#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function main(input) {
  const [path, tree] = input.split('\n\n');

  let i = 0, n = 'AAA';
  while(n !== 'ZZZ')
    n = tree.substr(tree.indexOf(n + ' ') + 7 + 5 * (path[i++ % path.length] == 'R'), 3);
  return i;
}

// function main(input) {
//   const [path, ...lines] = input.split(/\n+/g);

//   const tree = lines.reduce((t, l) => {
//     t[l.substring(0, 3)] = {L: l.substring(7, 10), R: l.substring(12, 15)};
//     return t;
//   }, {});

//   let i = 0, n = 'AAA';
//   while(n !== 'ZZZ') n = tree[n][path[i++ % path.length]];

//   return i;
// }

exec(main, '2023/day-8-input');
// 11309

console.log(main(`RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`));
console.log(main(`LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`));

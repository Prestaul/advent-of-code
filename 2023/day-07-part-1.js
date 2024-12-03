#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

const RANKS = [ '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

function main(input) {
  return input.split('\n').map(l => {
    const [hand, bid] = l.split(' ');

    const cards = hand.split('').map(c => RANKS.indexOf(c));

    const m = {};
    for (let c of cards) m[c] = m[c] ? m[c] + 1 : 1;

    const sets = Object.values(m).sort((a, b) => b - a);

    return [[sets[0],  sets[1] ?? 0, ...cards].reduce((a, b) => (a << 4) + b), Number(bid)];
  })
  .sort(([a], [b]) => a - b)
  .reduce((sum, [, bid], i) => sum + (i + 1) * bid, 0);
}

exec(main, 'inputs/2023/day-07.txt'); // 246912307

console.log(main(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`)); // 6440

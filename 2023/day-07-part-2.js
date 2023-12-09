#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

const RANKS = [ 'J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];

function main(input) {
  return input.split('\n').map(l => {
    const [hand, bid] = l.split(' ');

    const cards = hand.split('').map(c => RANKS.indexOf(c));

    const m = {};
    for (let c of cards) m[c] = m[c] ? m[c] + 1 : 1;

    const jokers = m[0] ?? 0;
    m[0] = 0;

    const sets = Object.values(m).sort((a, b) => b - a);
    sets[0] += jokers;

    return [[sets[0],  sets[1] ?? 0, ...cards].reduce((a, b) => (a << 4) + b), Number(bid)];
  })
  .sort(([a], [b]) => a - b)
  .reduce((sum, [, bid], i) => sum + (i + 1) * bid, 0);
}

exec(main, '2023/day-07-input'); // 246894760

console.log(main(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`)); // 5905

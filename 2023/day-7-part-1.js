#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

const VALS = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

function rank(cards) {
  const m = {};
  for (let c of cards) m[c] = m[c] ? m[c] + 1 : 1;

  const sets = Object.values(m).sort((a, b) => b - a);

  if (sets[0] === 1) return 0;
  if (sets[0] === 2 && sets[1] === 1) return 1;
  if (sets[0] === 2 && sets[1] === 2) return 2;
  if (sets[0] === 3 && sets[1] === 1) return 3;
  if (sets[0] === 3 && sets[1] === 2) return 4;
  if (sets[0] === 4) return 5;
  if (sets[0] === 5) return 6;
}

function main(input) {
  return input.split('\n').map(l => {
    const [h, b] = l.split(' ');

    const hand = Array.from(h).map(c => VALS[c]);
    const r = rank(hand);

    return [r, hand, Number(b)];
  }).sort(([ar, ah], [br, bh]) => ar - br || ah[0] - bh[0] || ah[1] - bh[1] || ah[2] - bh[2] || ah[3] - bh[3] || ah[4] - bh[4])
  .reduce((sum, [,, bid], i) => sum + (i + 1) * bid, 0);
}

exec(main, '2023/day-7-input');
// 246912307

console.log(main(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`));

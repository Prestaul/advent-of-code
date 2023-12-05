#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function main(input) {
  const [l1, ...lines] = input.split('\n\n');
  const seeds = l1.split('\n\n')[0].match(/\d+/g).map(Number);

  const ranges = lines.map(s => {
    const [, ...l] = s.split('\n');
    return l.map(r => r.split(' ').map(Number));
  });

  const locations = seeds.map(seed => {
    return ranges.reduce((v, r) => {
      const rng = r.find(([d, s, l]) => {
        return v >= s && v - s < l;
      });
      // console.log(v, rng, rng ? v - rng[1] + rng[0] : v);
      return rng ? v - rng[1] + rng[0] : v;
    }, seed);
  });

  return Math.min(...locations);
}

exec(main, '2023/day-5-input');

// console.log(main(`seeds: 79 14 55 13

// seed-to-soil map:
// 50 98 2
// 52 50 48

// soil-to-fertilizer map:
// 0 15 37
// 37 52 2
// 39 0 15

// fertilizer-to-water map:
// 49 53 8
// 0 11 42
// 42 0 7
// 57 7 4

// water-to-light map:
// 88 18 7
// 18 25 70

// light-to-temperature map:
// 45 77 23
// 81 45 19
// 68 64 13

// temperature-to-humidity map:
// 0 69 1
// 1 0 69

// humidity-to-location map:
// 60 56 37
// 56 93 4`));

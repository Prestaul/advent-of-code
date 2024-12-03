#!/usr/bin/env node
import { exec } from '../helpers/exec.js';

function main(input) {
  const [l1, ...lines] = input.split('\n\n');
  const sr = l1.split('\n\n')[0].match(/\d+/g).map(Number);

  const maps = lines.map(s => {
    const [, ...l] = s.split('\n');
    return l.map(r => r.split(' ').map(Number)).map(([d, s, l]) => [s, s + l - 1, d - s]);
  });

  let seeds = [];
  for(let i = 0; i < sr.length; i += 2) {
    seeds.push([ sr[i], sr[i] + sr[i + 1] - 1 ]);
  }

  // console.log(seeds);
  // console.log(maps);

  for (let map of maps) {
    let nextSeeds = [];
    let uncovered;
    // s = start of range, e = end of range, d = delta
    for (let [s, e, d] of map) {
      uncovered = [];
      for (let [start, end] of seeds) {
        // Seeds in range
        if (start <= e && end >= s) nextSeeds.push([Math.max(start, s) + d, Math.min(end, e) + d]);

        // Seeds before range
        if (start < s) uncovered.push([start, Math.min(end, s - 1)]);

        // Seeds after range
        if (end > e) uncovered.push([Math.max(start, e + 1), end]);
      }
      seeds = uncovered;
    }
    seeds = nextSeeds.concat(uncovered);
  }

  return Math.min(...seeds.map(s => s[0]));
}

exec(main, 'inputs/2023/day-05.txt'); // 63179500
// NOT 1289847033
// NOT 907939499
// NOT 477785216
// NOT 1176891800

console.log(main(`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`)); // 46

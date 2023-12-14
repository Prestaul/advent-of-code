#!/usr/bin/env node
import { exec } from '../helpers/exec.js';
import { iterate } from '../helpers/iterate.js';

function count(map, r, c, type) {
  return +(map[r-1]?.[c-1] === type)
    + +(map[r-1]?.[c] === type)
    + +(map[r-1]?.[c+1] === type)
    + +(map[r][c-1] === type)
    + +(map[r][c+1] === type)
    + +(map[r+1]?.[c-1] === type)
    + +(map[r+1]?.[c] === type)
    + +(map[r+1]?.[c+1] === type);
}

function step(map) {
  const h = map.length;
  const w = map[0].length;
  const nextMap = [];

  for (let r = 0; r < h; r++) {
    nextMap.push([]);
    for (let c = 0; c < w; c++) {
      switch(map[r][c]) {
        case '.':
          nextMap[r].push(count(map, r, c, '|') >= 3 ? '|' : '.');
          break;
        case '|':
          nextMap[r].push(count(map, r, c, '#') >= 3 ? '#' : '|');
          break;
          break;
        case '#':
          nextMap[r].push(count(map, r, c, '|') >= 1 && count(map, r, c, '#') >= 1 ? '#' : '.');
          break;
          break;
      }
    }
  }

  return nextMap;
}

function main(input, limit) {
  let map = input.split('\n').map(s => s.split(''));

  map = iterate({
    computeNext: step,
    limit,
    getKey: v => v.flat().join(''),
    initialValue: map,
    // debug: (v, i) => console.log(v.map(x => x.join('')).join('\n')),
  });

  map = map.flat();
  return map.filter(x => x === '|').length * map.filter(x => x === '#').length;
}

exec(main, '2018/day-18-input', 10); // 574590
exec(main, '2018/day-18-input', 1000000000); // 183787

console.log(main(`.#.#...|#.
.....#|##|
.|..|...#.
..|#.....#
#.#|||#|#|
...#.||...
.|....|...
||...#|.#|
|.||||..|.
...#.|..|.`, 10)); // 1147

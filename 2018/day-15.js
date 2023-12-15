#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz=';
const encode = v => CHARS.charAt(v);

function getFlood(w) {
  // const cache = new Map();
  return (map, start) => {
    // if (cache.has(start)) return cache.get(start);

    const result = { distances: Object.create(map), directions: Object.create(map) };
    const { distances, directions } = result;
    // cache.set(start, result);

    function addToFrontier(i, dist, dir, nextFrontier) {
      if (distances[i] !== '.' || nextFrontier.has(i)) return;
      nextFrontier.add(i);
      distances[i] = dist;
      directions[i] = dir;
    }

    distances[start] = 0;

    let frontier = new Set().add(start);
    let dist = 1;
    while(frontier.size) {
      const nextFrontier = new Set();
      for (let i of frontier) {
        addToFrontier(i - w, dist, 'D', nextFrontier);
        addToFrontier(i - 1, dist, 'R', nextFrontier);
        addToFrontier(i + 1, dist, 'L', nextFrontier);
        addToFrontier(i + w, dist, 'U', nextFrontier);
      }

      frontier = nextFrontier;
      dist += 1;
    }

    return result;
  };
}

const LIMIT = 1000;
function main(input, elfDmg) {
  /** @type {number} */
  const w  = input.indexOf('\n') + 1;
  const DIRS = {
    U: -w,
    L: -1,
    R: 1,
    D: w
  };
  const emptyMap = new Array(input.length);
  Array.prototype.forEach.call(input, (c, i) => {
    emptyMap[i] = c === '#' || c === '\n' ? c : '.';
  });

  function expand(pos, map) {
    return [pos - w, pos - 1, pos + 1, pos + w].filter(i => typeof map[i] === 'number');
  }

  let units = [];
  const unitsById = new Map();
  const elves = new Set();
  const goblins = new Set();
  let currentMap = Object.create(emptyMap);
  input.replace(/[EG]/g, (race, pos) => {
    const unit = { id: encode(units.length), race, pos, hp: 200, dmg: !elfDmg || race === 'G' ? 3 : elfDmg }
    currentMap[pos] = unit.id;

    units.push(unit);
    unitsById.set(unit.id, unit);
    if (race === 'G') goblins.add(unit);
    else elves.add(unit);

    return unit.id;
  });

  function getEnemy(self, pos) {
    const target = unitsById.get(currentMap[pos]);
    if (target && target.hp > 0 && target.race !== self.race) return target;
  }

  // console.log('Start:', elves.size, 'elves');

  let round = 0;
  do {
    const flood = getFlood(w);

    for (let self of units) {
      if (self.hp <= 0) continue;

      const enemies = self.race === 'G' ? elves : goblins;

      if (enemies.size === 0) {
        console.log(`Round ${round}:`, elves.size, 'elves');
        // console.log(currentMap.join(''));
        // console.log(units.indexOf(self) + 1, 'of', units.length);
        return units.reduce((sum, { hp }) => sum + (hp > 0 ? hp : 0), 0) * round;
      }

      const { distances, directions } = flood(currentMap, self.pos);

      let inRange = new Set();
      for (let enemy of enemies) expand(enemy.pos, distances).forEach(pos => inRange.add(pos));

      if (inRange.size > 0 && !inRange.has(self.pos)) {
        // Move
        let dest = [...inRange].sort((a, b) => (distances[a] - distances[b]) || (a - b))[0];
        while (distances[dest] > 1) dest += DIRS[directions[dest]];

        delete currentMap[self.pos];
        currentMap[dest] = self.id;
        self.pos = dest;
      }

      // Attack
      const [target] = [
        getEnemy(self, self.pos - w),
        getEnemy(self, self.pos - 1),
        getEnemy(self, self.pos + 1),
        getEnemy(self, self.pos + w)
      ].filter(Boolean).sort((a, b) => (a.hp - b.hp) || (a.pos - b.pos));
      if (target) {
        target.hp -= self.dmg;
        if (target.hp <= 0) {
          delete currentMap[target.pos];
          if (target.race === 'G') goblins.delete(target);
          else {
            elves.delete(target);
            if (elfDmg) return false;
          }
        }
      }
    }
    // console.log(round + 1);
    // console.log(currentMap.join(''));
    // console.log(units.map(({ id, race, hp }) => [id, race, hp]))
    units = units.filter(({ hp }) => hp > 0).sort((a, b) => a.pos - b.pos);
    // const m = Object.create(currentMap);
    // units.forEach(({ pos, race }) => m[pos] = race);
    // console.log(m.join(''));
  } while (round++ < LIMIT)
}

function part1(input) {
  return main(input);
}

function part2(input) {
  let dmg = 4;
  let result;
  do {
    result = main(input, dmg++);
  } while(!result)
  return result;
}

const sampleInput = `#########
#G......#
#.E.#...#
#..##..G#
#...##..#
#...#...#
#.G...G.#
#.....G.#
#########`;
test(part1, sampleInput, 18740);
test(part2, sampleInput, 1140);

const inputFile = '2018/day-15-input';
exec(part1, inputFile); // => 319410
exec(part2, inputFile); // => 63168

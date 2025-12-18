#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';
import { DIRS, LEFT, RIGHT } from '../helpers/grid.js';

function init(input) {
  const cars = [];
  const map = input?.split('\n').map((l, y) => l.split('').map((c, x) => {
    if (c in DIRS) {
      cars.push({ x, y, dir: c, next: 'L', hit: false })
      return '.';
    }
    return c === '|' || c === '-' ? '.' : c;
  }));
  return {
    cars,
    map,
    sortCars: () => cars.sort((a, b) => (a.y - b.y) || (a.x - b.x)),
    move(car) {
      const { dir, next } = car;
      const [dx, dy] = DIRS[dir];
      const c = map[car.y += dy][car.x += dx];
      if (c === '/') car.dir = dx ? LEFT[dir] : RIGHT[dir];
      if (c === '\\') car.dir = dx ? RIGHT[dir] : LEFT[dir];
      if (c === '+')
        if (next === 'L') {
          car.dir = LEFT[dir];
          car.next = 'S';
        } else if (next === 'R') {
          car.dir = RIGHT[dir];
          car.next = 'L'
        } else
          car.next = 'R'

      // Look for collisions
      return cars.findIndex(c => c !== car && !c.hit && c.x === car.x && c.y === car.y);
    }
  };
}

function part1(input) {
  const { map, cars, sortCars, move } = init(input);

  while(true)
    for (const car of sortCars())
      if (move(car, map, cars) !== -1)
        return [car.x, car.y].join();
}

function part2(input) {
  const { map, cars, sortCars, move } = init(input);

  let remaining = cars.length, j;
  while(remaining > 1)
    for (const car of sortCars())
      if (!car.hit && (j = move(car, map, cars)) !== -1) {
        car.hit = cars[j].hit = true;
        remaining -= 2;
      }

  const last = cars.find((c) => !c.hit);
  return [last.x, last.y].join();
}

const inputFile = 'inputs/2018/day-13.txt';
const sampleInput1 = `
/->-\\........
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/...`.replace(/ /g, '.').trim();

test(part1, sampleInput1, '7,3');
exec(part1, inputFile, '8,3');

const sampleInput2 = `
/>-<\\..
|   |..
| /<+-\\
| | | v
\\>+</ |
  |   ^
  \\<->/`.replace(/ /g, '.').trim();

test(part2, sampleInput2, '6,4');
exec(part2, inputFile, '73,121');

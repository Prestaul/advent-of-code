#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

const dirs = {
  '^': [0, -1],
  '>': [1, 0],
  'v': [0, 1],
  '<': [-1, 0],
}

function part1(input) {
  const [map, instructions] = input.split('\n\n');
  const grid = map.split('\n').map(l => l.split(''));
  const s = map.indexOf('@');
  const w = grid[0].length;

  function move(x, y, dx, dy) {
    const d = grid[y + dy]?.[x + dx];
    if (d === '.' || (d === 'O' && move(x + dx, y + dy, dx, dy))) {
      [grid[y][x], grid[y + dy][x + dx]] = [grid[y + dy][x + dx], grid[y][x]];
      return true;
    }
    return false;
  }

  let x = s % (w + 1);
  let y = Math.floor(s / (w + 1));

  for (const i of instructions.replaceAll('\n', '')) {
    const [dx, dy] = dirs[i];
    if (move(x, y, dx, dy)) {
      x += dx;
      y += dy;
    }
  }

  // console.log(grid.map(l => l.join('')).join('\n'));

  let sum = 0;
  grid.forEach((l, y) => l.forEach((c, x) => sum += c === 'O' && 100 * y + x));
  return sum;
}

function part2(input) {
  let [map, instructions] = input.split('\n\n');
  map = map.replaceAll('#', '##').replaceAll('O', '[]').replaceAll('.', '..').replaceAll('@', '@.');
  const grid = map.split('\n').map(l => l.split(''));
  const s = map.indexOf('@');
  const w = grid[0].length;

  let x = s % (w + 1);
  let y = Math.floor(s / (w + 1));
  let dx, dy;

  function canMove(x, y) {
    const x2 = x + dx, y2 = y + dy;
    const d = grid[y2]?.[x2];

    if (d === '#') return false;
    if (d === '.') return true;

    if (dx) {
      return canMove(x2 + dx, y);
    } else {
      return canMove(x2, y2) && canMove(x2 + (d === '[' ? 1 : -1), y2);
    }
  }

  function doMove(x, y) {
    const x2 = x + dx, y2 = y + dy;
    const d = grid[y2]?.[x2];

    if (d !== '.') {
      // Move the box
      doMove(x2 + (dx ||  (d === '[' ? 1 : -1)), y2, dx, dy);
      doMove(x2, y2, dx, dy);
    }

    // Move self
    [grid[y][x], grid[y2][x2]] = [grid[y2][x2], grid[y][x]];
  }

  for (const i of instructions.replaceAll('\n', '')) {
    [dx, dy] = dirs[i];
    if (canMove(x, y)) {
      doMove(x, y);
      x += dx;
      y += dy;
    }
  }

  // console.log(grid.map(l => l.join('')).join('\n'));

  let sum = 0;
  grid.forEach((l, y) => l.forEach((c, x) => sum += c === '[' && 100 * y + x));
  return sum;
}

const inputFile = 'inputs/2024/day-15.txt';
const sampleInput = `
##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`.trim();

test(part1, `
########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`.trim(), 2028);
test(part1, sampleInput, 10092)
exec(part1, inputFile, 1509863);

test(part2, sampleInput, 9021);
exec(part2, inputFile, 1548815);

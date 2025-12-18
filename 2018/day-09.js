#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function getBoard() {
  const board = [[0, 0, 0]]; // linked list: [index left, index right, value]
  let i = 0;

  return {
    insert(value) {
      const left = board[i];
      const right = board[left[1]];
      i = board.push([i, left[1], value]) - 1;
      left[1] = i;
      right[0] = i;
    },
    remove() {
      const [l, r, value] = board[i];
      board[l][1] = r;
      board[r][0] = l;
      i = r;
      return value;
    },
    left(n) {
      while (n--) i = board[i][0];
    },
    right(n) {
      while (n--) i = board[i][1];
    },
    print() {
      const s = [];
      let j = 0;
      do {
        s.push(j === i ? `(${j})` : j);
        j = board[j][1]
      } while (j)
      console.log(s.join(' '));
    },
  }
}

function solve(input, mult = 1) {
  let [players, marbles] = [...input.matchAll(/\d+/g)].map(Number);
  const { left, right, insert, remove } = getBoard();
  const scores = Array(players).fill(0);

  marbles *= mult;

  for (let m = 1, p = 0; m <= marbles; m++, p = ++p % players) {
    if (m % 23 === 0) {
      scores[p] += m;
      left(7);
      scores[p] += remove();
    } else {
      right(1);
      insert(m);
    }
  }

  return Math.max(...scores);
}

const inputFile = 'inputs/2018/day-09.txt';

// Part 1
test(solve, '9 players; last marble is worth 25 points', 32);
test(solve, '10 players; last marble is worth 1618 points', 8317);
test(solve, '13 players; last marble is worth 7999 points', 146373);
test(solve, '17 players; last marble is worth 1104 points', 2764);
test(solve, '21 players; last marble is worth 6111 points', 54718);
test(solve, '30 players; last marble is worth 5807 points', 37305);
exec(solve, inputFile, 367634);

// Part 2
test(solve, '9 players; last marble is worth 25 points', 22563, 100);
exec(solve, inputFile, 3020072891, 100);

#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';
import { memoize } from '../helpers/memoize.js';

function direct(input, blinks) {
  let stones = input.match(/\d+/g), newStones = [];

  while (blinks--) {
    for (let i = 0, j = 0; i < stones.length; i++) {
      const stone = stones[i];
      if (stone === '0') newStones[j++] = '1';
      else if (stone.length % 2) newStones[j++] = '' + (stone * 2024);
      else{
        newStones[j++] = stone.substring(0, stone.length / 2);
        newStones[j++] = '' + +stone.substring(stone.length / 2);
      }
    }
    [stones, newStones] = [newStones, stones];
  }

  return stones.length;
}

function recursive(input, blinks) {
  function blink(stone, n) {
    if (n === 0) return 1;
    if (stone === '0') return blink('1', n - 1);
    if (stone.length % 2) return blink('' + stone * 2024, n - 1);
    return blink(stone.substring(0, stone.length / 2), n - 1)
      + blink('' + +stone.substring(stone.length / 2), n - 1);
  }

  return input.match(/\d+/g).map(s => blink(s, blinks)).reduce((a, b) => a + b);
}

function memoized(input, blinks) {
  const blink = memoize((stone, n) => {
    if (n === 0) return 1;
    if (stone === '0') return blink('1', n - 1);
    if (stone.length % 2) return blink('' + stone * 2024, n - 1);
    return blink(stone.substring(0, stone.length / 2), n - 1)
      + blink('' + +stone.substring(stone.length / 2), n - 1);
  });

  return input.match(/\d+/g).map(s => blink(s, blinks)).reduce((a, b) => a + b);
}

const inputFile = 'inputs/2024/day-11.txt';
const sampleInput = `125 17`;

test(direct, sampleInput, 22, 6);
test(direct, sampleInput, 55312, 25);
exec(direct, inputFile, 183248, 25);

test(recursive, sampleInput, 22, 6);
test(recursive, sampleInput, 55312, 25);
exec(recursive, inputFile, 183248, 25);

test(memoized, sampleInput, 22, 6);
test(memoized, sampleInput, 55312, 25);
exec(memoized, inputFile, 183248, 25);
exec(memoized, inputFile, 218811774248729, 75);

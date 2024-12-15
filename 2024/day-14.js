#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input, { w, h, step }) {
  const mw = (w-1) / 2, mh = (h-1) / 2;
  return input.split('\n').map(l => l.match(/-?\d+/g).map(Number)).reduce((acc, [x, y, vx, vy]) => {
    x = (x + vx * step) % w;
    y = (y + vy * step) % h;

    if (x < 0) x += w;
    if (y < 0) y += h;

    if (x < mw && y < mh) acc[0]++;
    if (x > mw && y < mh) acc[1]++;
    if (x < mw && y > mh) acc[2]++;
    if (x > mw && y > mh) acc[3]++;
    return acc;
  }, [0, 0, 0, 0]).reduce((a, b) => a * b);
}


function part2(input, { w, h }) {
  const bots = input.split('\n').map(l => l.match(/-?\d+/g).map(Number)).map(([x, y, vx, vy]) => ({ x, y, vx, vy }));

  function print() {
    const grid = Array.from({ length: h }, () => Array.from({ length: w }, () => '.'));
    for (let {x, y} of bots) grid[y][x] = '#';
    console.log();
    console.log(grid.map(r => r.join('')).join('\n'));
  }

  const minVar = [];
  // y int -> 84 + 103n -> (s - 84) / 103
  // x int -> 28 + 101n -> (s - 28) / 101
  //          56 + 2n = 0
  //          n = -56 / 2
  //          n = -28
  //
  // for (let step = 1; step <= 10403; step += 1) {
  // for (let step = -2800; step <= 10403*100; step += 10403) {
  for (let step = 1; step < 7604; step += 1) {

    /*
      https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Online_algorithm

      Let n ← 0, Sum ← 0, SumSq ← 0
      For each datum x:
      n ← n + 1
      Sum ← Sum + x
      SumSq ← SumSq + x × x
      Var = (SumSq − (Sum × Sum) / n) / (n − 1)
    */
    let xSum = 0, xSumSq = 0;
    let ySum = 0, ySumSq = 0;

    for(const bot of bots) {
    // for(let {x, y, vx, vy} of bots) {
      let {x, y, vx, vy} = bot;
      x = (x + vx * step) % w;
      y = (y + vy * step) % h;

      if (x < 0) x += w;
      if (y < 0) y += h;

      // bot.x = (bot.x + bot.vx + w) % w;
      // bot.y = (bot.y + bot.vy + h) % h;
      // sum += Math.abs(34 - x);
      xSum += x;
      xSumSq += x * x;
      ySum += y;
      ySumSq += y * y;

      bot.x = x; bot.y = y;
    }

    const xv = (xSumSq - (xSum * xSum) / bots.length) / (bots.length);
    const yv = (ySumSq - (ySum * ySum) / bots.length) / (bots.length);
    // const v = sum / bots.length;

    if (xv < 450 && yv < 450) {
      console.log({ step, xv, yv });
      print();
      minVar.push({ step, xv, yv });
    }
    // print()
    // if (test()) return step;
  }
  // print();
  console.log(minVar);



  // .filter(({ x, y }) => x !== mw && y !== mh).reduce((acc, { x, y }) => {
  //   if (x < mw && y < mh) acc[0]++;
  //   if (x > mw && y < mh) acc[1]++;
  //   if (x < mw && y > mh) acc[2]++;
  //   if (x > mw && y > mh) acc[3]++;
  //   return acc;
  // }, [0, 0, 0, 0]).reduce((a, b) => a * b);
}

const inputFile = 'inputs/2024/day-14.txt';
const sampleInput = `
p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`.trim();

// test(part1, 'p=2,4 v=2,-3', 6);
test(part1, sampleInput, 12, { w:11, h:7, step:100 });
exec(part1, inputFile, 224438715, { w:101, h:103, step:100 }); // 22 min

// test(part2, sampleInput, 123, { w:11, h:7 });
exec(part2, inputFile, null, { w:101, h:103 }); // LOW 533

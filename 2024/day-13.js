#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

// function part1(input) {
//   return input.split('\n\n').map(puzzle => {
//     const [ax, ay, bx, by, px, py] = puzzle.match(/\d+/sg).map(Number);

//     let cost = 0;
//     for (let a = 0; a <= 100; a++)
//       for (let b = 0; b <= 100; b++)
//         if (a * ax + b * bx === px && a * ay + b * by === py) {
//           let c = b + a * 3;
//           if (c < cost || cost === 0) cost = c;
//         }

//       return cost;
//   }).reduce((a, b) => a + b);
// }

/*
const matrix = [[x1, y1], [x2, y2]];
const det = x1 * y2 - y1 * x2;
const inverted = [[y2, -y1], [-x2, x1]];
const dot = [p1 * y2 - p2 * y1, -p1 * x2 + p2 * x1];
const a = dot[0] / det;
const b = dot[1] / det;
*/
function solve(input, bump = 0) {
  return input.split('\n\n').map(puzzle => {
    let [x1, y1, x2, y2, p1, p2] = puzzle.match(/\d+/sg).map(Number);

    p1 += bump;
    p2 += bump;

    const det = x1 * y2 - y1 * x2;
    if (det === 0) return 0;

    const a = (p1 * y2 + p2 * -x2) / det;
    const b = (p1 * -y1 + p2 * x1) / det;

    if (a % 1 || b % 1 || a < 0 || b < 0) return 0;
    return a * 3 + b;
  }).reduce((a, b) => a + b);
}

const inputFile = 'inputs/2024/day-13.txt';
const sampleInput = `
Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`.trim();

test(solve, sampleInput, 480);
exec(solve, inputFile, 36870);

test(solve, sampleInput, 875318608908, 10000000000000);
exec(solve, inputFile, 78101482023732, 10000000000000);
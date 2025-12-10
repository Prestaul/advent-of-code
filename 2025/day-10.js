#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';
import { solve } from "yalps"

function part1(input) {
  return input.split('\n').map(l => {
    const [target, ...buttons] = l.split(' ').slice(0, -1);
    return [
      target.slice(1, -1).split('').map(c => c === '#'),
      buttons.map(b => b.slice(1, -1).split(',').map(Number)),
    ];
  }).reduce((sum, [target, buttons]) => {
    let minPresses = Infinity;

    // Try all combinations of button presses (2^buttons.length)
    const totalCombinations = 1 << buttons.length;
    for (let comb = 0; comb < totalCombinations; comb++) {
      const state = Array.from({ length: target.length }, () => false);
      const presses = [];
      for (let b = 0; b < buttons.length; b++) {
        if (comb & (1 << b)) presses.push(b);
      }

      // Apply the button presses
      for (const b of presses) {
        for (const pos of buttons[b]) {
          state[pos] = !state[pos];
        }
      }

      // Check if the state matches the target
      if (state.every((v, i) => v === target[i])) {
        minPresses = Math.min(minPresses, presses.length);
      }
    }

    return sum + (minPresses === Infinity ? 0 : minPresses);
  }, 0);
}

/*
  Solve using Integer Linear Programming with yalps (Yet Another Linear Programming Solver)

  This is line 1 of the sample input converted to yalps' ILP model:
    {
      // Goal is to minimize the number of button presses
      direction: 'minimize',
      objective: 'presses',

      // Each button contributes to one or more sums and counts as a press
      variables: {
        button0: { sum0: 0, sum1: 0, sum2: 0, sum3: 1, presses: 1 },
        button1: { sum0: 0, sum1: 1, sum2: 0, sum3: 1, presses: 1 },
        button2: { sum0: 0, sum1: 0, sum2: 1, sum3: 0, presses: 1 },
        button3: { sum0: 0, sum1: 0, sum2: 1, sum3: 1, presses: 1 },
        button4: { sum0: 1, sum1: 0, sum2: 1, sum3: 0, presses: 1 },
        button5: { sum0: 1, sum1: 1, sum2: 0, sum3: 0, presses: 1 },
      },

      // Target values are our constraints
      constraints: {
        sum0: { equal: 3 },
        sum1: { equal: 5 },
        sum2: { equal: 4 },
        sum3: { equal: 7 },
      },

      // All button variables must be integers
      integers: [
        'button0',
        'button1',
        'button2',
        'button3',
        'button4',
        'button5',
      ],
    }
*/
function part2(input) {
  return input.split('\n').map(l => {
    const tuples = l.split(' ');
    const target = tuples.pop().slice(1, -1).split(',');
    const buttons = tuples.slice(1);

    const constraints = Object.fromEntries(
      target.map((val, i) => [`sum${i}`, { equal: Number(val) }])
    );

    const variables = Object.fromEntries(
      buttons.map((b, i) => [
        `button${i}`,
        Object.fromEntries(
          b.slice(1, -1).split(',').map(pos => [
            `sum${pos}`, 1
          ]).concat([['presses', 1]])
        )
      ])
    );

    return {
      direction: 'minimize',
      objective: 'presses',
      variables,
      constraints,
      integers: buttons.map((_, i) => `button${i}`),
    };
  }).reduce((sum, model) => {
    // Use an ILP solver to minimize button presses
    const solution = solve(model);
    if (solution.status === 'optimal')
      return sum + solution.result;

    console.warn('No solution found for line:', line);
    return sum;
  }, 0);
}

const inputFile = 'inputs/2025/day-10.txt';
const sampleInput = `
[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`.trim();

test(part1, sampleInput, 7);
exec(part1, inputFile, 436);

test(part2, sampleInput, 33);
exec(part2, inputFile, 14999);

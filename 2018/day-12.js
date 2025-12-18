#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function score(state, offset) {
  let sum = 0;
  for (let i = 0; i < state.length; i++)
    if (state[i] === '#') sum += i - offset;
  return sum;
}

function solve(input, gens = 20) {
  const [a, b] =  input.split('\n\n');
  let state = a.substring(15);
  let toLeft = 0;
  const patterns = new Set(b.split('\n').map(l => l[9] === '#' ? l.slice(0, 5) : null).filter(Boolean));

  for (let gen = 0; gen < gens; gen++) {
    let nextState = [];
    if (patterns.has('...' + state[0] + state[1])) {
      nextState.push('#');
      toLeft += 1;
    }

    for(let i = 0; i < state.length; i++) {
      const window = state.slice(Math.max(0, i - 2), Math.min(i + 3, state.length))[i > 2 ? 'padEnd' : 'padStart'](5, '.');
      nextState.push(patterns.has(window) ? '#' : '.');
    }

    if (patterns.has(state.at(-2) + state.at(-1) + '...'))
      nextState.push('#');

    // After about 100 generations it begins increasing by a constant amount with each generation.
    // After 150 generations just computed the final value.
    if (gen === 150) {
      const prev = score(state, toLeft);
      const curr = score(nextState, toLeft);
      return curr + (gens - gen - 1) * (curr - prev)
    }

    state = nextState.join('');
  }

  return score(state, toLeft);
}

const inputFile = 'inputs/2018/day-12.txt';
const sampleInput = `
initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`.trim();

test(solve, sampleInput, 325);
exec(solve, inputFile, 3472);

exec(solve, inputFile, 2600000000919, 50000000000);

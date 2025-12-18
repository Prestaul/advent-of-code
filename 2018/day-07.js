#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  let done = '';
  const forward = {};
  const back = {};
  for (const [, a, b] of input.matchAll(/(\w) must be finished before step (\w)/g)) {
    forward[a] ??= [];
    forward[a].push(b);
    back[b] ??= [];
    back[b].push(a);
  }

  const available = Object.keys(forward).filter(s => !back[s]);
  do {
    const step = available.shift();
    done += step;
    if (!(step in forward)) return done;
    for (const next of forward[step])
      if (!available.includes(next) && back[next].every(b => done.includes(b)))
        available.push(next);
    available.sort();
  } while (true)
}

function part2(input, workerCount, minTime = 0) {
  let done = '';
  const forward = {};
  const back = {};
  for (const [, a, b] of input.matchAll(/(\w) must be finished before step (\w)/g)) {
    forward[a] ??= [];
    forward[a].push(b);
    back[b] ??= [];
    back[b].push(a);
  }

  const available = Object.keys(forward).filter(s => !back[s]);
  const workers = Array.from({ length: workerCount }, () => [null, -1]);
  let time = 0;
  do {
    for (const worker of workers) {
      let [s, t] = worker;

      if (s && t <= 0) {
        if (!(s in forward)) return time;
        done += s;
        for (const next of forward[s])
          if (!available.includes(next) && back[next].every(b => done.includes(b)))
            available.push(next);
        available.sort();
        s = null;
      }

      if (!s) {
        s = available.shift();
        t = s ? s.charCodeAt(0) - 64 + minTime : 0;
      }

      worker[0] = s;
      worker[1] = t - 1;
    }
    time += 1;
  } while(true)
}

const inputFile = 'inputs/2018/day-07.txt';
const sampleInput = `
Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`.trim();

test(part1, sampleInput, 'CABDFE');
exec(part1, inputFile, 'IJLFUVDACEHGRZPNKQWSBTMXOY');

test(part2, sampleInput, 15, 2);
exec(part2, inputFile, 1072, 5, 60);

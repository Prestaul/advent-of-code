#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

const gcd = (a, b) => a ? gcd(b % a, a): b;
const lcm = (a, b) => a * b / gcd(a, b);

function parse(input) {
  const network = Object.fromEntries(input.split('\n').map(l => {
    const [a, b] = l.split(' -> ');
    const type = a[0];
    const id = a.slice(1);
    const to = b.split(', ');
    const module = { id, type, to };
    if (type === '%') module.state = 0;
    if (type === '&') module.state = {};
    return [id, module]
  }));

  const modules = Object.values(network);
  modules.forEach(({ id, to }) => {
    to.forEach(m => {
      m = network[m];
      if (m && m.type === '&') m.state[id] = 0;
    })
  });

  return network;
}

function part1(input) {
  const network = parse(input);

  let low = 0, high = 0;
  function pushButton() {
    const queue = [['button', 'roadcaster', 0]];
    let signal;
    while(signal = queue.shift()) {
      const [fromId, toId, highlow] = signal;
      // console.log(fromId, highlow, module?.id, module?.state);
      if (highlow) high++;
      else low++;
      const module = network[toId];
      if (!module) continue;
      const { id, type, to, state } = module;
      if (type === 'b') {
        queue.push(...to.map(dest => [id, dest, highlow]))
      }
      if (type === '%' && highlow === 0) {
        module.state = state ? 0 : 1;
        queue.push(...to.map(dest => [id, dest, module.state]));
      }
      if (type === '&') {
        state[fromId] = highlow;
        const out = Object.values(state).every(v => v === 1) ? 0 : 1;
        queue.push(...to.map(dest => [id, dest, out]));
      }
    }
  }

  for (let i = 1000; i--;)
    pushButton();

  return low * high;
}

function part2(input) {
  const network = parse(input);

  let i = 0;
  const counts = {
    fv: 0,
    jd: 0,
    lm: 0,
    vm: 0,
  };
  function pushButton() {
    i += 1;
    const queue = [['button', 'roadcaster', 0]];
    let signal;
    while(signal = queue.shift()) {
      const [fromId, toId, highlow] = signal;

      // console.log(fromId, highlow, module?.id, module?.state);
      if (highlow === 0 && toId in counts && !counts[toId]) counts[toId] = i;

      const module = network[toId];
      if (!module) continue;
      const { id, type, to, state } = module;
      if (type === 'b') {
        queue.push(...to.map(dest => [id, dest, highlow]))
      }
      if (type === '%' && highlow === 0) {
        module.state = state ? 0 : 1;
        queue.push(...to.map(dest => [id, dest, module.state]));
      }
      if (type === '&') {
        state[fromId] = highlow;
        const out = Object.values(state).every(v => v === 1) ? 0 : 1;
        queue.push(...to.map(dest => [id, dest, out]));
      }
    }
  }

  while(!Object.values(counts).every(Boolean) ) pushButton();
  console.log(i, counts);
  // let i = 0;
  // do {
  //   i++;
  // } while(!pushButton())

  // return i;
}

test(part1, `
broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a
`.trim(), 32000000);

test(part1, `
broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output
`.trim(), 11687500);

// test(part2, sampleInput, 123);

const inputFile = '2023/day-20-input';
exec(part1, inputFile); // => 825896364
exec(part2, inputFile); // =>

console.log([3911,3907,3929,4057].reduce(lcm))

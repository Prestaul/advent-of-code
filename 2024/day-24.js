#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  const [init, gates] = input.split('\n\n');
  const registers = Object.fromEntries(init.split('\n').map(l => l.split(': ')).map(([k, v]) => [k, Number(v)]));
  const instructions = gates.split('\n').map(l => l.match(/\w{2,3}/g));

  while (instructions.length) {
    for (let i = 0; i < instructions.length; i++) {
      const [a, op, b, c] = instructions[i];

      if (!(a in registers && b in registers)) continue;

      const av = registers[a];
      const bv = registers[b];

      if (op === 'AND') registers[c] = av & bv;
      else if (op === 'OR') registers[c] = av | bv;
      else if (op === 'XOR') registers[c] = av ^ bv;

      instructions.splice(i, 1);
      i--;
    }
  }

  return parseInt(Object.entries(registers).filter(([k]) => k.startsWith('z')).sort(([a], [b]) => b.localeCompare(a)).map(([k, v]) => v).join(''), 2);
}

function part2(input) {
  const [init, gates] = input.split('\n\n');
  const registers = Object.fromEntries(init.split('\n').map(l => l.split(': ')).map(([k, v]) => [k, Number(v)]));
  const instructions = gates.split('\n').map(l => l.match(/\w{2,3}/g));
  // IGNORE PART 2 HERE. I SOLVED MANUALLY BY REORDERING THE OPERATIONS IN THE INPUT FILE... IT WASN'T PRETTY, BUT IT WORKED.
}
//   1101
//   0110
//  10011

// z0 = x0 ^ y0;
// z1 = (x0 & y0) ^ (x1 ^ y1);
// z2 = (x0 & y0) ^ (x1 & y1) ^ (x2 ^ y2);
// z3 = (x0 & y0) ^ (x1 & y1) ^ (x2 & y2) ^ (x3 ^ y3);


const inputFile = 'inputs/2024/day-24.txt';
const sampleInput = `
x00: 1
x01: 0
x02: 1
x03: 1
x04: 0
y00: 1
y01: 1
y02: 1
y03: 1
y04: 1

ntg XOR fgs -> mjb
y02 OR x01 -> tnw
kwq OR kpj -> z05
x00 OR x03 -> fst
tgd XOR rvg -> z01
vdt OR tnw -> bfw
bfw AND frj -> z10
ffh OR nrd -> bqk
y00 AND y03 -> djm
y03 OR y00 -> psh
bqk OR frj -> z08
tnw OR fst -> frj
gnj AND tgd -> z11
bfw XOR mjb -> z00
x03 OR x00 -> vdt
gnj AND wpb -> z02
x04 AND y00 -> kjc
djm OR pbm -> qhw
nrd AND vdt -> hwm
kjc AND fst -> rvg
y04 OR y02 -> fgs
y01 AND x02 -> pbm
ntg OR kjc -> kwq
psh XOR fgs -> tgd
qhw XOR tgd -> z09
pbm OR djm -> kpj
x03 XOR y03 -> ffh
x00 XOR y04 -> ntg
bfw OR bqk -> z06
nrd XOR fgs -> wpb
frj XOR qhw -> z04
bqk OR frj -> z07
y03 OR x01 -> nrd
hwm AND bqk -> z03
tgd XOR rvg -> z12
tnw OR pbm -> gnj`.trim();

test(part1, sampleInput, 2024);
exec(part1, inputFile, 41324968993486);

// test(part2, sampleInput, 123);
// exec(part2, inputFile, 'bmn,jss,mvb,rds,wss,z08,z18,z23');

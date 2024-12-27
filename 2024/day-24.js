#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function tick(registers, instructions) {
  const done = []
  let remaining = instructions.length;
  while (remaining) {
    for (let i = 0; i < instructions.length; i++) if (!done[i]) {
      if (!instructions[i]) console.log({i, instructions: instructions[i]});
      const [a, op, b, c] = instructions[i];

      if (!(a in registers && b in registers)) continue;

      const av = registers[a];
      const bv = registers[b];

      if (op === 'AND') registers[c] = av & bv;
      else if (op === 'OR') registers[c] = av | bv;
      else if (op === 'XOR') registers[c] = av ^ bv;

      // instructions.splice(i, 1);
      done[i] = true;
      remaining -= 1;
      i--;
    }
  }

  return registers;
}

function part1(input) {
  const [init, gates] = input.split('\n\n');
  const registers = Object.fromEntries(init.split('\n').map(l => l.split(': ')).map(([k, v]) => [k, Number(v)]));
  const instructions = gates.split('\n').map(l => l.match(/\w{2,3}/g));

  tick(registers, instructions);

  return read(registers, 'z');
}

function readBinary(registers, name) {
  return Object.entries(registers).filter(([k]) => k.startsWith(name)).sort(([a], [b]) => b.localeCompare(a)).map(([k, v]) => v).join('').padStart(46, '0');
}
function read(registers, name) {
  return parseInt(readBinary(registers, name), 2);
}
function initialize(values) {
  const registers = {};
  for (const [name, value] of Object.entries(values)) {
    const bits = value.toString(2).split('').reverse();
    for (let i = 0; i < 46; i++) {
      registers[`${name}${i < 10 ? 0 : ''}${i}`] = +(bits[i] === '1');
    }
  }
  return registers;
}

function part2badbits(input) {
  const [init, gates] = input.split('\n\n');
  const instructions = gates.split('\n').map(l => l.match(/\w{2,3}/g));

  let x = 0;
  for (let i = 0; i < 45; i++) {
    x += 2 ** i;
    const mem = tick(initialize({ x, y: 1 }), instructions);
    const z = read(mem, 'z');
    if ((z ^ (x + 1)) >>> 0) x -= 2 ** i;
  }
  console.log(x.toString(2));

  // z08, z14/15, z18, z23

  // IGNORE PART 2 HERE. I SOLVED MANUALLY BY REORDERING THE OPERATIONS IN THE INPUT FILE... IT WASN'T PRETTY, BUT IT WORKED.
}
// x 0100001101011111001100100010100101111010101111
// y 0101001011110111101011000010101100010000011111
// z 1001011001010110111000000110001110001011001110
//   1001011001010110110111100101010010001011001110
//                     11111   11 111
//                         1    1  11     1
//   5432109876543210987654321098765432109876543210
//   444444333333333322222222221111111111

//   1101
//   0110
//  10011

// z0 = x0 ^ y0;
// z1 = (x0 & y0) ^ (x1 ^ y1);
// z2 = (x0 & y0) ^ (x1 & y1) ^ (x2 ^ y2);
// z3 = (x0 & y0) ^ (x1 & y1) ^ (x2 & y2) ^ (x3 ^ y3);

function r(c, i) {
  return c + (i < 10 ? '0' : '') + i;
}

function part2(input) {
  const [, gates] = input.split('\n\n');
  const instructions = gates.split('\n').map(l => l.match(/\w{2,3}/g));

  const opFromOutput = {};
  const outputFromOp = {};
  for (const [a, op, b, output] of instructions) {
    opFromOutput[output] = [a, op, b];
    outputFromOp[[a, op, b].join()] = output;
    outputFromOp[[b, op, a].join()] = output;
  }
  const getOutput = (a, op, b) => outputFromOp[[a, op, b].join()];

  function swap(a, b) {
    const opA = opFromOutput[a];
    const opB = opFromOutput[b];
    opFromOutput[a] = opB;
    opFromOutput[b] = opA;

    outputFromOp[opA.join()] = b;
    outputFromOp[opA.toReversed().join()] = b;
    outputFromOp[opB.join()] = a;
    outputFromOp[opB.toReversed().join()] = a;
  }

  const badOps = [];

  let prevAdded = getOutput('x01', 'XOR', 'y01');
  let prevCarry = getOutput('x00', 'AND', 'y00');
  // Check the logic for each bit independently
  // Ignore the first 2 bits and last bit because they use different logic
  for (let bit = 2; bit < 45; bit++) {
    // Attempt to verify the five operations required to build each bit of the output
    let addedBit = getOutput(r('x', bit), 'XOR', r('y', bit));
    let carryBit = getOutput(r('x', bit - 1), 'AND', r('y', bit - 1));
    let prevCarryBit = getOutput(prevAdded, 'AND', prevCarry);
    let combinedCarry = getOutput(carryBit, 'OR', prevCarryBit);
    let output = getOutput(addedBit, 'XOR', combinedCarry);

    const z = r('z', bit);

    // TODO: Check combinedCarry, carryBit, and addedBit?
    if (!output) {
      // If output is not defined then one of it's inputs is wrong
      const [l, op, r] = opFromOutput[z];
      if (l !== addedBit && r !== addedBit) {
        const bad = l === combinedCarry ? r : l;
        console.log('BAD ADDED BIT', {bit, registers: [addedBit, bad]});
        badOps.push([addedBit, bad]);
        swap(addedBit, bad);
        addedBit = bad;
      }
      else if (l !== combinedCarry && r !== combinedCarry) {
        const bad = l === addedBit ? r : l;
        console.log('BAD COMBINED CARRY', {bit, registers: [combinedCarry, bad]});
        badOps.push([combinedCarry, bad]);
        swap(combinedCarry, bad);
        combinedCarry = bad;
      }
    }
    else if (output !== z) {
      // Final output should always be the z-bit
      console.log('BAD OUTPUT', {bit, registers: [output, z]});
      badOps.push([output, z]);
      swap(output, z);
    }

    prevAdded = addedBit;
    prevCarry = combinedCarry;
  }

  return badOps.flat().sort();
}

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
// exec(part2badbits, inputFile, 'bmn,jss,mvb,rds,wss,z08,z18,z23');
// exec(part2badbits, 'inputs/2024/day-24.txt', 'bmn,jss,mvb,rds,wss,z08,z18,z23');
exec(part2, 'inputs/2024/day-24.txt', 'bmn,jss,mvb,rds,wss,z08,z18,z23');
// exec(part2, 'inputs/2024/day-24-corrected.txt', 'bmn,jss,mvb,rds,wss,z08,z18,z23');
// exec(part2, 'inputs/2024/day-24-corrected.txt', 'bmn,jss,mvb,rds,wss,z08,z18,z23');

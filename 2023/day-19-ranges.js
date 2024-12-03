#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function parse(input) {
  const [in1] = input.split('\n\n');

  return Object.fromEntries(in1.split('\n').map(l => {
    const [key, list] = l.slice(0, -1).split('{');
    return [key, list.split(',').map(r => {
      const [, xmas, op, val, dest] = r.match(/^(?:([xmas])([><])(\d+):)?(\w+)$/);
      if (xmas) return { xmas, op, val: Number(val), dest };
      return { dest };
    })]
  }));
}

function part2(input) {
  const workflows = parse(input);
  let result = 0;

  function processWorkflow(id, ranges) {
    if (id === 'R') return;
    if (id === 'A') {
      result += Object.values(ranges).reduce((c, [start, end]) => c * (end - start + 1), 1);
      return;
    }

    const workflow = workflows[id];
    ranges = {...ranges};
    for (const { xmas, op, val, dest } of workflow) {
      if (!op) {
        processWorkflow(dest, ranges);
        continue;
      }

      const [min, max] = ranges[xmas];

      if (op === '<') {
        processWorkflow(dest, { ...ranges, [xmas]: [min, val - 1] });
        ranges[xmas] = [val, max];
        continue;
      }

      // op === '>'
      processWorkflow(dest, { ...ranges, [xmas]: [val + 1, max] });
      ranges[xmas] = [min, val];
    }
  }

  processWorkflow('in', {
    x: [1, 4000],
    m: [1, 4000],
    a: [1, 4000],
    s: [1, 4000],
  });

  return result;
}

const sampleInput = `
px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`.trim();
// test(part1, sampleInput, 19114);
test(part2, sampleInput, 167409079868000);

const inputFile = 'inputs/2023/day-19.txt';
// exec(part1, inputFile); // => 280909
exec(part2, inputFile); // => 116138474394508

#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function parse(input, withParts = false) {
  const [in1, in2] = input.split('\n\n');

  const parts = in2.split('\n').map(l => l.match(/\d+/g).map(Number)).map(([x,m,a,s]) => ({x,m,a,s}));

  const rules = Object.fromEntries(in1.split('\n').map(l => {
    const [xmas, list] = l.slice(0, -1).split('{');
    return [xmas, list.split(',').map(r => {
      const [, xmas, op, val, dest] = r.match(/^(?:([xmas])([><])(\d+):)?(\w+)$/);
      return { xmas, op, val: val && +val, dest };
    })]
  }));

  return { parts, rules };
}

function compress(rules) {
  const indices = {
    x: new Set([1, 4000]),
    m: new Set([1, 4000]),
    a: new Set([1, 4000]),
    s: new Set([1, 4000]),
  };

  // Collect values from rules
  for (const rule of Object.values(rules))
    for (const { xmas, val } of rule)
      if (xmas && val)
        indices[xmas].add(val);

  const sizes = {};
  const counts = {};
  // Create indices
  for (const xmas of 'xmas') {
    indices[xmas] = [...indices[xmas]].sort((a, b) => a - b);
    sizes[xmas] = indices[xmas].map((n, i) => indices[xmas][i + 1] - n || 1),
    counts[xmas] = indices[xmas].length;
  }

  // console.log(indices);
  // console.log(sizes);
  // console.log(counts, counts.x * counts.m * counts.a * counts.s);

  // Compress rules
  for (const rule of Object.values(rules))
    for (const step of rule)
      if (step.xmas && step.val) step.val = indices[step.xmas].indexOf(step.val);

  return {
    indices,
    counts,
    uncompress: ({x,m,a,s}) => sizes.x[x] * sizes.m[m] * sizes.a[a] * sizes.s[s],
  };
}

function validate(part, [{ xmas, op, val, dest}, ...nextRule], rules) {
  if (op === '>' && part[xmas] <= val) return validate(part, nextRule, rules);
  if (op === '<' && part[xmas] >= val) return validate(part, nextRule, rules);
  if (dest === 'A') return true;
  if (dest === 'R') return false;
  return validate(part, rules[dest], rules);
}

function part1(input) {
  const { parts, rules } = parse(input, true);
  return parts.filter(part => validate(part, rules.in, rules)).reduce((sum, {x,m,a,s}) => sum + x+m+a+s, 0)
}

function part2(input) {
  const { rules } = parse(input);
  const { counts, indices, uncompress } = compress(rules);

  // console.log(counts);
  // console.log('total', counts.x * counts.m * counts.a * counts.s);

  let sum = 0;
  for (let x = counts.x; x--;)
    for (let m = counts.m; m--;)
      for (let a = counts.a; a--;)
        for (let s = counts.s; s--;)
          if (validate({ x, m, a, s }, rules.in, rules)) {
            console.log('valid', { x, m, a, s });
            sum += uncompress({ x, m, a, s });
          }

  console.log(indices);

  return sum;
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
test(part1, sampleInput, 19114);
test(part2, sampleInput, 167409079868000);

const inputFile = '2023/day-19-input';
exec(part1, inputFile); // => 280909
// exec(part2, inputFile); // =>

#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  const lines = input.split('\n');
  const rules = lines.splice(0, lines.indexOf(''));
  const badUpdate = new RegExp(rules.map(s => s.split('|')).map(([b, a]) => a + '.*' + b).join('|'));

  return lines.slice(1)
    .filter(u => !badUpdate.test(u))
    .map(u => u.split(','))
    .reduce((acc, pages) => acc + Number(pages[(pages.length - 1)/2]), 0);
}

function part2(input) {
  const lines = input.split('\n');
  const rules = lines.splice(0, lines.indexOf(''));
  const badUpdate = new RegExp(rules.map(s => s.split('|')).map(([b, a]) => a + '.*' + b).join('|'));

  return lines.slice(1)
    .filter(u => badUpdate.test(u))
    .map(u => u.split(',').toSorted((a, b) => rules.includes(a + '|' + b) ? 1 : -1))
    .reduce((acc, pages) => acc + Number(pages[(pages.length - 1)/2]), 0);
}

const sampleInput = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`.trim();
test(part1, sampleInput, 143);
test(part2, sampleInput, 123);

const inputFile = 'inputs/2024/day-05.txt';
exec(part1, inputFile, 6612);
exec(part2, inputFile, 4944);

#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  const [rules, updates] = input.split('\n\n');
  const rulesMap = rules.split('\n').reduce((acc, line) => {
    const [before, after] = line.split('|');
    (acc[after] ??= []).push(before);
    return acc;
  }, {});

  return updates.split('\n').map(update => update.split(',')).filter(pages => {;
    let i = pages.length;
    while(i--)
      for (let j = i - 1; j >= 0; j--)
        if (rulesMap[pages[j]]?.includes(pages[i])) return false;
    return true;
  })
  .reduce((acc, pages) => acc + Number(pages[(pages.length - 1)/2]), 0);
}

function part2(input) {
  const [rules, updates] = input.split('\n\n');
  const rulesMap = rules.split('\n').reduce((acc, line) => {
    const [before, after] = line.split('|');
    (acc[after] ??= []).push(before);
    return acc;
  }, {});

  return updates.split('\n').map(update => update.split(',')).filter(pages => {;
    let i = pages.length;
    while(i--)
      for (let j = i - 1; j >= 0; j--)
        if (rulesMap[pages[j]]?.includes(pages[i])) return true;
    return false;
  })
  .reduce((acc, pages) => {
    pages.sort((a, b) => rulesMap[a]?.includes(b) ? 1 : -1);
    return acc + Number(pages[(pages.length - 1)/2]);
  }, 0);
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

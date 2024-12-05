#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function golf(i, p) {
  return i.split`\n\n`[1].split`\n`.map(u => u.split`,`).map(u=>[u,u.toSorted((a,b)=>-i.includes(a+'|'+b))]).filter(([u,s])=>p^u.every((v,i)=>v===s[i])).reduce((a,u)=>a+ +u[p][(u[p].length-1)/2],0);
}

// Pass `part - 1` as second arg. i.e. for part one pass zero
function commented(input, part) {
  return input
    // Drop the rules and parse the updates
    .split('\n\n')[1].split('\n').map(u => u.split(','))
    // Sort and return both the original and sorted pages
    .map(u => [u, u.toSorted((a, b) => -input.includes(a + '|' + b))])
    // Where sorted pages do or do not match the original depending on part
    .filter(([u, sorted]) => part ^ u.every((_, i) => u[i] === sorted[i]))
    // Sum the middle pages from orifinal or sorted depending on part
    .reduce((acc, u) => acc + Number(u[part][(u[part].length - 1)/2]), 0);
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
test(golf, sampleInput, 143, 0);
test(golf, sampleInput, 123, 1);

const inputFile = 'inputs/2024/day-05.txt';
exec(golf, inputFile, 6612, 0);
exec(golf, inputFile, 4944, 1);

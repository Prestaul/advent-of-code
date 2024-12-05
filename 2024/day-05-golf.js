#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

// 154 chars
function golf(i, p) {
  return i.match(/.+,.+/gm).map(u => u.split`,`)
    .map(u=>[u,u.toSorted((a,b)=>-i.includes(a+'|'+b))])
    .reduce((a,u)=>p^``+u[0]==u[1]?a+ +u[p][(u[p].length-1)/2]:a,0)
}

// Pass `part - 1` as second arg. i.e. for part one pass zero
function commented(input, part) {
  return input
    // Parse lines with commas into lists of pages
    .match(/.+,.+/gm).map(u => u.split(','))
    // Sort and return both the original and sorted pages
    .map(u => [u, u.toSorted((a, b) => -input.includes(a + '|' + b))])
    // Convert lists to strings to see if they are the same
    .reduce((acc,u)=>part^``+u[0]==u[1]
    // Sum the middle pages from original or sorted depending on part
    ?acc+ +u[part][(u[part].length-1)/2]:acc,0)
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

#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function toSleepCounts(input) {
  const sleeping = {};
  let currentGuard = null;
  let currRangeStartMin = null;
  let currRangeStartDate = null;
  for(const l of input.split('\n')) {
    const [, date, minute, guard, asleep, awake] = l.match(/(\d\d) \d\d:(\d\d)\] (?:Guard #(\d+) begins shift|falls (asleep)|wakes (up))/);

    if(guard) {
      currentGuard = guard;
      sleeping[currentGuard] ??= Array(60).fill(0);
    }
    else if(asleep) {
      currRangeStartMin = parseInt(minute, 10);
      currRangeStartDate = date;
    }
    else if(awake) {
      let m = currRangeStartMin;
      const end = parseInt(minute, 10);
      if (currRangeStartDate !== date) {
        // Guard fell asleep before midnight and woke up after midnight
        for (; m < 60; m++) sleeping[currentGuard][m]++;
        m = 0;
      }
      for(; m < end; m++) sleeping[currentGuard][m]++;
    } else {
      throw new Error('Unrecognized log line: ' + l);
    }
  }
  return sleeping;
}

function part1(input) {
  const sleeping = toSleepCounts(input);

  const { minute, guard } = Object.entries(sleeping).reduce((acc, [guardId, guardMinutes]) => {
    const sum = guardMinutes.reduce((a, b) => a + b, 0);
    if (sum > acc.max) return { max: sum, minute: guardMinutes.reduce((bestM, val, m) => val > guardMinutes[bestM] ? m : bestM, 0), guard: guardId };
    return acc;
  }, { max: 0, minute: null, guard: null });

  return minute * parseInt(guard, 10);
}

function part2(input) {
  const sleeping = toSleepCounts(input);

  const { minute, guard } = Object.entries(sleeping).reduce((acc, [guardId, guardMinutes]) => {
    const max = Math.max(...guardMinutes);
    if (max > acc.max) return { max: max, minute: guardMinutes.indexOf(max), guard: guardId };
    return acc;
  }, { max: 0, minute: null, guard: null });

  return minute * parseInt(guard, 10);
}

const inputFile = 'inputs/2018/day-04.txt';
const sampleInput = `
[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`.trim();

test(part1, sampleInput, 240);
exec(part1, inputFile, 94040);

test(part2, sampleInput, 4455);
exec(part2, inputFile, 39940);

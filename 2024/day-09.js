#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  input = [...input].map(Number);

  let sum = 0, pos = 0;
  let l = 0, r = input.length - 1;

  // First file from right side
  let idRight = r / 2;
  let sizeRight = input[r];

  do {
    // Insert file from left side
    const id = l / 2;
    let size = +input[l];
    while (size--) sum += id * pos++;

    // Fill space
    let space = +input[++l];
    while (space--) {
      if (!sizeRight--) {
        // Next file from right side
        r -= 2;
        idRight = r / 2;
        sizeRight = +input[r] - 1;
      }

      sum += idRight * pos++;
    }
  } while (++l < r);

  // Whatever is left over from last file from left side
  while (sizeRight--) sum += idRight * pos++;

  return sum;
}

function part2(input) {
  const mem = [];

  // Create memory blocks for each file and empty space.
  for (let i = 0, pos = 0; i < input.length; i++) {
    const id = i / 2;

    let size = +input[i];
    mem.push({ pos, size, id });
    pos += size;

    if (++i < input.length) {
      size = +input[i];
      mem.push({ pos, size });
      pos += size;
    }
  }

  // Loop through files and insert them into empty spaces.
  let i = mem.length;
  nextFile: while (i--) {
    const f = mem[i];
    if (!f.id) continue; // Ignore empty spaces

    // Find space large enough for file
    for (let j = 1; j < i; j++) {
      const s = mem[j];
      if (s.id) continue; // Ignore files
      if (s.size >= f.size) {
        // Move the file and take memory from the empty space
        f.pos = s.pos;
        s.size -= f.size;
        s.pos += f.size;
        continue nextFile;
      }
    }
  }

  // Checksum
  return mem.reduce((sum, f) => {
    if (f.id) while (f.size--) sum += f.id * f.pos++;
    return sum;
  }, 0);
}

const sampleInput = `
2333133121414131402`.trim();
test(part1, sampleInput, 1928);
test(part2, sampleInput, 2858);

const inputFile = 'inputs/2024/day-09.txt';
exec(part1, inputFile, 6430446922192);
exec(part2, inputFile, 6460170593016);

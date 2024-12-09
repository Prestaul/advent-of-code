#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function parseInput(input) {
  let pos = 0;
  // Create memory blocks for each file and empty space.
  return [...input].map(Number).map((size, i) => {
    const mem = { pos, size, id: i % 2 ? null : i / 2 };
    pos += size;
    return mem;
  });
}

function checksum(mem) {
  return mem.reduce((sum, f) => {
    if (f.id) while (f.size--) sum += f.id * f.pos++;
    return sum;
  }, 0);
}

function part1(input) {
  const mem = parseInput(input);

  // Files from right side
  let r = mem.length - 1;
  // Empty space from left side
  for (let l = 1; l < r; l += 2) {
    const space = mem[l];
    let available = space.size;
    while (available) {
      const file = mem[r];
      if (file.size <= available) {
        // Move the file and take memory from the space
        file.pos = space.pos;
        available = space.size -= file.size;
        space.pos += file.size;
        r -= 2;
      } else {
        // Overwrite the space with a section of the file
        space.id = file.id;
        file.size -= space.size;
        available = 0;
      }
    }
  }

  return checksum(mem);
}


function part2(input) {
  const mem = parseInput(input);

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

  return checksum(mem);
}

const sampleInput = `
2333133121414131402`.trim();
test(part1, sampleInput, 1928);
test(part2, sampleInput, 2858);

const inputFile = 'inputs/2024/day-09.txt';
exec(part1, inputFile, 6430446922192);
exec(part2, inputFile, 6460170593016);

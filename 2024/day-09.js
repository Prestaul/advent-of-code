#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  // Generate memory blocks containing files segments or empty spaces.
  const mem = [...input].flatMap((length, i) => Array.from({ length }, () => i % 2 ? -1 : i / 2));

  for (let l = 0, r = mem.length - 1; l < r; l++) {
    // Find empty space from left side, find file blocks from right side
    if (mem[l] >= 0) continue;
    while (mem[r] < 0) r--;

    // Swap empty space with file block
    [mem[l], mem[r]] = [mem[r], mem[l]];
  }

  let pos = 0;
  return mem.reduce((sum, i) => sum + (~i && i) * pos++, 0);
}

function part2(input) {
  // Get list of files and empty space.
  let pos = 0;
  const mem = [...input].map(Number).map((size, i) => {
    const mem = { pos, size, id: i % 2 ? null : i / 2 };
    pos += size;
    return mem;
  });

  // Loop through files and insert them into empty spaces.
  nextFile: for (let i = mem.length; i--;) {
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

  return mem.reduce((sum, { id, size, pos }) => {
    if (id) while (size--) sum += id * pos++;
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

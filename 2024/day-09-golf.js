#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(z,s=0) {
  for(let m=[...z].flatMap((length, i)=>Array.from({length},_=>i%2?-1:i/2)),l=0,r=m.length-1,i;i=m[l],l<=r;s+=i*l++)while(i<0)i=m[r--];return s
}

// Init sum as arg to avoid needing var/let/const
function part1Expanded(input, sum = 0) {
  // For each memory block length in input...
  const mem = [...input].flatMap((length, id) =>
    // ...insert `length` memory blocks with the file's id
    Array.from({ length }, () =>
      // If empty space then use -1 in place of an id
      id % 2 ? -1 : id / 2
    )
  );

  for (
    // Set up pointers at left and right ends
    let l = 0, r = mem.length - 1, id;
    // Before each iteration:
    // Get id from left and quit loop if left and right pointers converge
    id = mem[l], l <= r;
    // After each iteration:
    // Add the id to the checksum and move the left pointer
    sum += id * l++
  )
    // In each iteration: (i.e. before the `sum` above)
    // If the slot is empty, use id from the next file block on the right
    while (id < 0) id = mem[r--];

  return sum;
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


//  left pointer  v
//         input  00...111...2...333.44.5555.6666.777.888899
// right pointer                                           ^
//        result  009981118882777333644655556

const sampleInput = `
2333133121414131402`.trim();
test(part1, sampleInput, 1928);
test(part2, sampleInput, 2858);

const inputFile = 'inputs/2024/day-09.txt';
exec(part1, inputFile, 6430446922192);
exec(part1Expanded, inputFile, 6430446922192);
exec(part2, inputFile, 6460170593016);

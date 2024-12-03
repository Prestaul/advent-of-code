#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function dropBlocks(input) {
  const blocksByLayer = [];
  const protoBlock = {
    above() {
      return blocksByLayer[this.z1 + 1]?.filter(b => b.overlaps(this)) ?? [];
    },
    below() {
      return blocksByLayer[this.z0 - 1]?.filter(b => b.overlaps(this)) ?? [];
    },
    overlaps(block) {
      return this.x0 <= block.x1 && block.x0 <= this.x1
          && this.y0 <= block.y1 && block.y0 <= this.y1;
    },
  };

  // Parse and sort blocks
  const blocks = input.split('\n')
    .map(l => l.match(/\d+/g)
    .map(Number))
    .map(([x0,y0,z0,x1,y1,z1]) => Object.assign(Object.create(protoBlock), { x0, y0, z0, x1, y1, z1 }))
    .toSorted((a, b) => a.z0 - b.z0);

  for (const block of blocks) {
    // Drop as low as possible
    while (block.z0 > 1 && block.below().every(b => !b.overlaps(block))) {
      block.z0 -= 1;
      block.z1 -= 1;
    }

    // Add to index
    for (let z = block.z0; z <= block.z1; z++) (blocksByLayer[z] ??= []).push(block);
  }

  return blocks;
}

function getSupportBlocks(blocks) {
  return blocks.filter(block => {
    const supporting = block.above();
    return supporting.length > 0 && supporting.some(b => b.below().length === 1);
  });
}

function destroy(block, destroyed = new Set()) {
  destroyed.add(block);
  for (const a of block.above()) {
    if (a.below().every(b => destroyed.has(b))) {
      destroy(a, destroyed);
    }
  }

  return destroyed.size;
}

function part1(input) {
  const blocks = dropBlocks(input);
  const supportBlocks = getSupportBlocks(blocks);
  return blocks.length - supportBlocks.length;
}

function part2(input) {
  const blocks = dropBlocks(input);
  const supportBlocks = getSupportBlocks(blocks);
  return supportBlocks.map(b => destroy(b) - 1).reduce((a, b) => a + b);
}

const sampleInput = `
1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`.trim();
test(part1, sampleInput, 5);
test(part2, sampleInput, 7);

const inputFile = '2023/day-22-input.txt';
exec(part1, inputFile); // => 413
exec(part2, inputFile); // => 41610
exec(part1, '2023/day-22-input-shannon'); // => 424
exec(part2, '2023/day-22-input-shannon'); // => 55483

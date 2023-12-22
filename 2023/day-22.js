#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function dropBlocks(input) {
  const blocksByZ0 = [];
  const blocksByZ1 = [];
  const protoBlock = {
    above() {
      return blocksByZ0[this.z1 + 1]?.filter(b => b.overlaps(this)) ?? [];
    },
    below() {
      return blocksByZ1[this.z0 - 1]?.filter(b => b.overlaps(this)) ?? [];
    },
    overlaps(block) {
      return this.x0 <= block.x1 && block.x0 <= this.x1
          && this.y0 <= block.y1 && block.y0 <= this.y1;
    },
  }

  const blocks = input.split('\n')
    .map(l => l.match(/\d+/g)
    .map(Number))
    .map(([x0,y0,z0,x1,y1,z1]) => Object.assign(Object.create(protoBlock), {
      x0: Math.min(x0,x1), y0: Math.min(y0,y1), z0: Math.min(z0,z1),
      x1: Math.max(x0,x1), y1: Math.max(y0,y1), z1: Math.max(z0,z1),
    }))
    .toSorted((a, b) => a.z0 - b.z0);

  dropBlocks: for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    let { z0, z1 } = block;

    for (let z = z0; z > 0; z--) {
      if (z === 1 || blocksByZ1[z - 1]?.some(b => b.overlaps(block))) {
        block.z0 = z;
        block.z1 = z + z1 - z0;
        (blocksByZ0[block.z0] ??= []).push(block);
        (blocksByZ1[block.z1] ??= []).push(block);
        continue dropBlocks;
      }
    }
  }

  return blocks;
}

function getSupportBlocks(blocks) {
  return blocks.filter(block => {
    const supporting = block.above();
    return supporting.length > 0 && supporting.some(b => b.below().length === 1);
  });
}

function destroy(block, destroyed) {
  destroyed ??= new Set([ block ]);

  for (const a of block.above()) {
    if (a.below().every(b => destroyed.has(b))) {
      destroyed.add(a);
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

const inputFile = '2023/day-22-input';
exec(part1, inputFile); // => 413
exec(part2, inputFile); // => 41610
// LOW 1216 1163
// HIGH 107258

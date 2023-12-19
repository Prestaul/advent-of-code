import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

function run(fn, input, ...args) {
  const start = Date.now();
  console.time(' Runtime');
  const result = fn(input, ...args);
  console.timeEnd(' Runtime');
  console.log('  Output:', result);
  if (Date.now() - start > 60000) process.stdout.write('\u0007'); // Bell
  return result;
}

export function exec(fn, inputFile, ...args) {
  const input = readFileSync(join(ROOT, inputFile), { encoding: 'utf8' });
  console.log(' Running:', fn.name);
  run(fn, input, ...args);
  console.log();
}

export function test(fn, input, ...args) {
  console.log(' Testing:', fn.name);
  const expected = args.pop();
  const result = run(fn, input, ...args);
  console.log('Expected:', expected, result != expected ? '- FAILED' : '');
  console.log();
}

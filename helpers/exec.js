import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

export function exec(fn, inputFile, ...args) {
  const input = readFileSync(join(ROOT, inputFile), { encoding: 'utf8' });
  console.time();
  const result = fn(input, ...args);
  console.timeEnd();
  console.log(result);
}

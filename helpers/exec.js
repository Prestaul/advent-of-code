import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

export function exec(fn, inputFile) {
  const input = readFileSync(join(ROOT, inputFile), { encoding: 'utf8' });
  const result = fn(input);
  process.stdout.write(result + '\n');
}

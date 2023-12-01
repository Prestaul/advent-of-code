import { readFileSync } from 'node:fs';

export function exec(fn, inputFile) {
  const input = readFileSync(inputFile, { encoding: 'utf8' });
  const result = fn(input);
  process.stdout.write(result + '\n');
}

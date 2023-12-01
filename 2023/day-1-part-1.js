import { exec } from '../helpers/exec.js';

function main(input) {
  return input.split('\n')
    .map(s => s.replaceAll(/\D/g, ''))
    .reduce((sum, s) => sum + Number(s[0] + s.at(-1)), 0);
}

exec(main, 'day-1-input');

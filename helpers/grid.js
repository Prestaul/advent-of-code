export const NESW = [[-1, 0], [0, 1], [1, 0], [0, -1]];
export const ESWN = [[0, 1], [1, 0], [0, -1], [-1, 0]];
export const NSWE = [[-1, 0], [1, 0], [0, -1], [0, 1], ];

function isFn(v) {
  return typeof v === 'function';
}

export function getGrid(input, { init } = {}) {
  const grid = init
    ? input.split('\n').map((l, y) => l.split('').map((v, x) => init(v, x, y)))
    : input.split('\n').map(l => l.split(''));
  const w = grid[0].length, h = grid.length;

  return {
    grid,
    w,
    h,
    print: (g = grid) => g.map(l => l.join('')).join('\n'),
    coords: (c, ...rest) => {
      if ((c = input.indexOf(c)) === -1) throw new Error(`Could not find coords for ${c}.`);
      return [c % (w + 1), Math.floor(c / (w + 1)), ...rest];
    },
    iterate: (fn, g = grid) => g.forEach((l, y) => l.forEach((v, x) => fn(v, x, y))),
    reduce: (fn, init, g = grid) => g.reduce((a, l, y) => l.reduce((b, v, x) => fn(b, v, x, y), a), init),
    filled: init => isFn(init)
      ? Array(h).fill().map((_, y) => Array(w).fill().map((_, x) => init(x, y)))
      : Array(h).fill().map(_ => Array(w).fill(init)),
  }
}

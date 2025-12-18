export const NESW = [[-1, 0], [0, 1], [1, 0], [0, -1]];
export const ESWN = [[0, 1], [1, 0], [0, -1], [-1, 0]];
export const NSWE = [[-1, 0], [1, 0], [0, -1], [0, 1], ];
export const DIAGS = [[-1, -1], [-1, 1], [1, 1], [1, -1]];

export const DIRS = {
  '^': [ 0, -1],
  '>': [ 1,  0],
  'v': [ 0,  1],
  '<': [-1,  0],
};
export const LEFT = {
  '^': '<',
  '>': '^',
  'v': '>',
  '<': 'v',
};
export const RIGHT = {
  '^': '>',
  '>': 'v',
  'v': '<',
  '<': '^',
};

function isFn(v) {
  return typeof v === 'function';
}

export function getGrid({ input, width, height, init }) {
  init = isFn(init) ? init : init !== undefined ? () => init : (v) => v;
  const parsedInput = input?.split('\n').map(l => l.split(''));
  const w = width || parsedInput[0].length;
  const h = height || parsedInput.length;
  const grid = Array.from({ length: h }, (_, y) => Array.from({ length: w }, (_, x) => init(parsedInput?.[y]?.[x], x, y)));

  const self = {
    grid,
    w,
    h,
    print: (g = grid) => g.map(l => l.join('')).join('\n'),
    coords: (c, ...rest) => {
      if ((c = input.indexOf(c)) === -1) throw new Error(`Could not find coords for ${c}.`);
      return [c % (w + 1), Math.floor(c / (w + 1)), ...rest];
    },
    iterate: (fn, g = grid) => g.forEach((l, y) => l.forEach((v, x) => fn(v, x, y, self))),
    reduce: (fn, init, g = grid) => g.reduce((a, l, y) => l.reduce((b, v, x) => fn(b, v, x, y, self), a), init),
    map: (fn, g = grid) => g.forEach((l, y) => l.forEach((v, x) => g[y][x] = fn(v, x, y, self))),
    filled: init => isFn(init)
      ? Array(h).fill().map((_, y) => Array(w).fill().map((_, x) => init(x, y)))
      : Array(h).fill().map(_ => Array(w).fill(init)),
  }

  return self;
}

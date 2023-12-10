function main(input) {
  const w  = input.indexOf('\n') + 1;
  const h = (input.length + 1) / w ;
  let i = input.indexOf('S');
  let prev = i - w;

  const next = (p, c) => {
    switch(input[c]) {
      case 'S':
      case '|': return c + (p < c ? w : -w);
      case '-': return c + (p < c ? 1 : -1);
      case 'L': return c + (p < c ? 1 : -w);
      case 'J': return c + (p === c - 1 ? -w : -1);
      case '7': return c + (p < c ? w : -1);
      case 'F': return c + (p === c + 1 ? w : 1);
    }
  }

  const ctx = document.createElement('canvas').getContext('2d');
  ctx.moveTo(i % w, Math.floor(i / w));

  let onPath = 0;
  do {
    [i, prev] = [next(prev, i), i];
    ctx.lineTo(i % w, Math.floor(i / w));
    onPath += 1;
  } while (input[i] !== 'S')

  let inPath = 0;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
      if (ctx.isPointInPath(x, y)) inPath++;

  return inPath - onPath;
}

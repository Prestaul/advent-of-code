function exec(prog) {
  const input = prog.split(',');
  // const nums = [];
  const prev = new Map();
  let turn = 0;

  input.forEach(n => {
    turn += 1;
    // nums.push(n);
    prev.set(Number(n), turn);
  });

  let next = input.at(-1);
  next = prev.has(next) ? turn - prev.get(next) : 0;

  while (++turn < 30000000) {
    const n = next;
    next = prev.has(n) ? turn - prev.get(n) : 0;
    prev[n] = turn;
  }

  return next;
}

export function iterate({ computeNext, limit, initialValue, args = [], getKey = x => x, debug }) {
  const prevValues = new Map();
  let value = initialValue;
  let i = 0;
  let loopStart, loopEnd, resumedAt;
  while(i++ < limit) {
    value = computeNext(value, ...args);
    const key = getKey(value, i);

    if (debug) {
      console.log('cycle', i);
      debug(value, i, key);
    }

    if (prevValues.has(key) && !loopEnd) {
      loopStart = prevValues.get(key);
      loopEnd = i;
      const period = loopEnd - loopStart;
      const remaining = limit - i;
      resumedAt = i = limit - (remaining % period);
    } else {
      prevValues.set(key, i);
    }
  }

  if (loopEnd) {
    console.log('Cycle detected from', loopStart, 'to', loopEnd);
    console.log('Skipped from ', loopEnd, 'to', resumedAt);
  }

  return value;
}

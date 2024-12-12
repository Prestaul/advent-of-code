export const memoize =
  (fn, getKey = (...args) => args.join('•'), memo = {}) =>
    (...args) => memo[getKey(args)] ??= fn(...args);

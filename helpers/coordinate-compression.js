export function compress(values) {
  const uniques = new Set(values);
  const index = [...uniques].sort((a, b) => a - b);
  const sizes = index.map((n, i) => index[i + 1] - n || 1);

  // const compress = n => index.indexOf(n);
  // const uncompress = i => index[i];

  const compress = v => {
    const i = index.findIndex(n => n > v) - 1;
    return i + (v - index[i]) / sizes[i];
  }
  const uncompress = i => {
    const fraction = i % 1;
    i = Math.trunc(i);
    return Math.round(index[i] + fraction * sizes[i]);
  }

  return {
    compressed: values.map(n => index.indexOf(n)),
    index,
    sizes,
    count: index.length,
    compress,
    uncompress,
  };
}

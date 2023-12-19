export function compress(values) {
  const uniques = new Set(values);
  const index = [...uniques].sort((a, b) => a - b);
  const sizes = index.map((n, i) => index[i + 1] - n || 1);

  return {
    compressed: values.map(n => index.indexOf(n)),
    index,
    sizes,
    count: index.length,
    compress: n => index.indexOf(n),
    uncompress: i => index[i],
  };
}

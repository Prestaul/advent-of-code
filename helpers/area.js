// Compute the area enclosed by any simple polygon. ("simple" means segments never cross)
// Green's theorum: For every segment x0,y0->x1,y1, sum x0 * y1 - x1 * y0. The result is double the area of the polygon.
// https://www.mathopenref.com/coordpolygonarea.html
// https://stackoverflow.com/a/451482
// https://en.wikipedia.org/wiki/Polygon#Area
export function areaInPolygon(points) {
  const length = points.length;
  // If first and last are the same point then don't iterate to last coordinate
  const first = points[0], last = points.at(-1);
  const lastIndex = first[0] !== last[0] || first[1] !== last[1] ? length : length - 1;
  let sum = 0;
  for (let i = lastIndex;  i--;) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[(i + 1) % length];
    sum += x0 * y1 - x1 * y0;
  }
  return sum / 2;
}

// Like areaInPolygon but treats coordinates as being in the center of a pixel and includes
// the border pixels in the area.
export function pixelAreaInPolygon(path) {
  const length = path.length;
  // If first and last are the same point then don't iterate to last coordinate
  const first = path[0], last = path.at(-1);
  const lastIndex = first[0] !== last[0] || first[1] !== last[1] ? length : length - 1;
  let sum = 0;
  for (let i = lastIndex;  i--;) {
    const [x0, y0] = path[i];
    const [x1, y1] = path[(i + 1) % length];
    sum += x0 * y1 - x1 * y0 + Math.abs(x1 - x0 + y1 - y0);
  }
  return sum / 2 + 1; // Why do I have to add 1 here? Did I miss the starting square?
}

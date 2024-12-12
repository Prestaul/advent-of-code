#!/usr/bin/env node
import { exec, test } from '../helpers/exec.js';

function part1(input) {
  const grid = input.split('\n').map(l => l.split(''));
  const h = grid.length;
  const w = grid[0].length;

  // Track which cells have been added to a plot
  const plotted = Array.from({ length: h }, () => new Array(w).fill(0));

  let sum = 0;
  for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) {
    if (!plotted[y][x]) {
      // Do a walk of the plot
      const flower = grid[y][x];
      const plot = { area: 0, perimeter: 0 };

      const visited = Array.from({ length: h }, () => new Array(w).fill(0));
      const frontier = [[x, y]];
      while (frontier.length) {
        const [x, y] = frontier.pop();
        const v = visited[y]?.[x];
        const p = grid[y]?.[x];

        if (p && !v) visited[y][x] = 1;

        if (!p || (p !== flower)) {
          plot.perimeter++;
          continue;
        }

        if (v) continue;

        plot.area++;
        plotted[y][x] = 1;
        frontier.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
      }
      sum += plot.area * plot.perimeter;
    }
  }

  return sum;
}

const DIRS = [
  [1, 0, 0, -1],
  [0, 1, 1, 0],
  [-1, 0, 0, 1],
  [0, -1, -1, 0],
];
function part2(input) {
  const grid = input.split('\n').map(l => l.split(''));
  const h = grid.length, w = grid[0].length;

  // Track which cells have been added to a plot
  const plotted = Array.from({ length: h }, () => new Array(w).fill(0));

  let sum = 0;
  for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) {
    if (!plotted[y][x]) {
      const flower = grid[y][x];
      const plot = { area: 0, perimeter: 0 };

      const frontier = [[x, y]];
      while (frontier.length) {
        const [x, y] = frontier.pop();
        if (grid[y]?.[x] !== flower || plotted[y]?.[x]) continue;

        // Look at each of the 4 blocks of 4 with this cell in one corner.
        for (let d = 0; d < DIRS.length; d++) {
          const [dx1, dy1] = DIRS[d];
          const [dx2, dy2] = DIRS[(d + 1) % 4];
          // Sum up the number of cells that match this cell on each diagonal.
          //  d1 d2
          //  d2 d1
          const d1 = 1 + (grid[y + (dy1 || dy2)]?.[x + (dx1 || dx2)] === flower);
          const d2 = (grid[y][x + (dx1 || dx2)] === flower) + (grid[y + (dy1 || dy2)]?.[x] === flower);
          // Draw up all the possible 2x2 blocks, count up matches on diagonals, and you'll see that this condition finds corner cells.
          if (d2 === 0 || (d1 === 1 && d2 === 2)) plot.perimeter++;
        }

        plot.area++;
        plotted[y][x] = 1;
        frontier.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
      }
      sum += plot.area * plot.perimeter;
    }
  }

  return sum;
  // return Object.values(plots).flat().reduce((sum, plot) => {
  //   for (const [x, y] of plot) {
  //     const flower = grid[y][x];
  //     let sides =  0;
  //     for (let d = 0; d < DIRS.length; d++) {
  //       const [dx1, dy1] = DIRS[d];
  //       const [dx2, dy2] = DIRS[(d + 1) % 4];
  //       const d1 = 1 + (grid[y + (dy1 || dy2)]?.[x + (dx1 || dx2)] === flower);
  //       const d2 = (grid[y][x + (dx1 || dx2)] === flower) + (grid[y + (dy1 || dy2)]?.[x] === flower);
  //       if (d2 === 0 || (d1 === 1 && d2 === 2)) {
  //         sides++;
  //       }
  //     }
  //     // console.log({flower, plot, sides, cost: sides * plot.length})
  //     return sum + sides * plot.length;
  //   }
  // }, 0);


  // // console.log(Object.values(plots).flat());
  // return Object.values(plots).flat().reduce((a, plot) => {
  //   let sides = 1;
  //   const [[ix, iy]] = plot;
  //   const flower = grid[iy][ix];
  //   // console.log({flower, plot});
  //   let [[x, y]] = plot;

  //   let d = 0;

  //   let [dx, dy, wx, wy] = DIRS[d];
  //   function turn(r)  {
  //     sides++;
  //     d = (d + 4 + r) % 4;
  //     [dx, dy, wx, wy] = DIRS[d];
  //   }

  //   // console.log('corner', {d, x, y, /* dx, dy, wx, wy, */ sides, flower });
  //   // Find the next corner
  //   while(d !== 3 || x !== ix || y !== iy) {
  //     if (grid[y + wy]?.[x + wx] === flower) {
  //       turn(-1);
  //       x += dx;
  //       y += dy;
  //       // console.log('turning left', {x, y, sides});
  //     } else if (grid[y + dy]?.[x + dx] !== flower) {
  //       turn(1);
  //       // console.log('turning right', {x, y, sides});
  //     } else if (grid[y + dy]?.[x + dx] === flower) {
  //       x += dx;
  //       y += dy;
  //     }
  //   }

  //   console.log({flower, sides, area: plot.length });
  //   return a + plot.length * sides;
  // }, 0);

  // return Object.values(plots).flat().reduce((a, { area, perimeter }) => a + area * perimeter, 0);
}

function part22(input) {
  const grid = input.split('\n').map(l => l.split(''));
  const h = grid.length;
  const w = grid[0].length;
  const visited = Array.from({ length: h }, () => new Array(w).fill(0));

  const plots = {};
  const frontier = [];
  let sum = 0;
  for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) {
    if (!visited[y][x]) {
      const flower = grid[y][x];
      const plot = { area: 0 };
      (plots[flower] ??= []).push(plot);
      // const walls = {
      //   dx: { '-1': {}, 1: {}},
      //   dy: { '-1': {}, 1: {}}
      // };
      const walls = {
        dx: { '-1': new Set(), 1: new Set()},
        dy: { '-1': new Set(), 1: new Set()}
      };
      // const walls = {
      //   '-1,0': {},
      //   '1,0': {},
      //   '0,-1': {},
      //   '0,1': {},
      // };

      frontier.push([x, y, 0, 0]);
      while (frontier.length) {
        let [x, y, dx, dy] = frontier.pop();
        x += dx;
        y += dy;

        if (grid[y]?.[x] !== flower) {
          // if (dx)
          //   (walls.dx[dx][x] ??= []).push(y);
          // else
          //   (walls.dy[dy][y] ??= []).push(x);

          // (walls[[dx,dy].join(',')][dx ? x : y] ??= new Set()).add(dx ? y : x);

          if (dx)
            walls.dx[dx].add([x, y].join(','));
          else
            walls.dy[dy].add([x, y].join(','));
          continue;
        }
        if (visited[y]?.[x]) {
          continue;
        }

        plot.area++;

        visited[y][x] = 1;
        frontier.push([x, y, 1, 0], [x, y, -1, 0], [x, y, 0, 1], [x, y, 0, -1]);
      }

      // console.log(flower, plot);
      // console.log(walls);
      if (plot.area < 3) {
        sum += plot.area * 4;
        continue;
      }

      const countSequences = (a, arr) => {
        arr.sort();
        for (let i = 1; i < arr.length; i++) if(arr[i] - arr[i - 1] > 1) a++;
        return a + 1;
      }

      const c = (a, arr) => {
        arr = [...arr].toSorted();
        // console.log(arr);
        for (let i = 1; i < arr.length; i++) if(arr[i] - arr[i - 1] > 1) a++;
        return a + 1;
      };
      // console.log(walls);
      // let count =
      //   Object.values(walls.dx[-1]).reduce(c, 0);
      //   Object.values(walls.dx[ 1]).reduce(c, 0);
      //   Object.values(walls.dy[-1]).reduce(c, 0);
      //   Object.values(walls.dy[ 1]).reduce(c, 0);
        // Object.values([...walls.dx[-1]].map(s => s.split(',').map(Number)).reduce((a, [x, y]) => { (a[x] ??= []).push(y); return a; }, {})).reduce(countSequences, 0) +
        // Object.values([...walls.dx[ 1]].map(s => s.split(',').map(Number)).reduce((a, [x, y]) => { (a[x] ??= []).push(y); return a; }, {})).reduce(countSequences, 0) +
        // Object.values([...walls.dy[-1]].map(s => s.split(',').map(Number)).reduce((a, [x, y]) => { (a[y] ??= []).push(x); return a; }, {})).reduce(countSequences, 0) +
        // Object.values([...walls.dy[ 1]].map(s => s.split(',').map(Number)).reduce((a, [x, y]) => { (a[y] ??= []).push(x); return a; }, {})).reduce(countSequences, 0);
      let count =
        Object.values([...walls.dx[-1]].map(s => s.split(',').map(Number)).reduce((a, [x, y]) => { (a[x] ??= []).push(y); return a; }, {})).reduce(countSequences, 0) +
        Object.values([...walls.dx[ 1]].map(s => s.split(',').map(Number)).reduce((a, [x, y]) => { (a[x] ??= []).push(y); return a; }, {})).reduce(countSequences, 0) +
        Object.values([...walls.dy[-1]].map(s => s.split(',').map(Number)).reduce((a, [x, y]) => { (a[y] ??= []).push(x); return a; }, {})).reduce(countSequences, 0) +
        Object.values([...walls.dy[ 1]].map(s => s.split(',').map(Number)).reduce((a, [x, y]) => { (a[y] ??= []).push(x); return a; }, {})).reduce(countSequences, 0);

      sum += plot.area * count;
    }
  }
  return sum;
}

function part23(input) {
  // Counts corners correctly but incorrectly combines plots with same letter
  const grid = input.split('\n').map(l => l.split(''));
  const h = grid.length;
  const w = grid[0].length;
  let sum = 0;
  for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) {
    const flower = grid[y][x];
    for (let d = 0; d < DIRS.length; d++) {
      const [dx1, dy1] = DIRS[d];
      const [dx2, dy2] = DIRS[(d + 1) % 4];

      const d1 = 1 + (grid[y + (dy1 || dy2)]?.[x + (dx1 || dx2)] === flower);
      const d2 = (grid[y][x + (dx1 || dx2)] === flower) + (grid[y + (dy1 || dy2)]?.[x] === flower);
      console.log({dx1, dy1, dx2, dy2});
      console.log({d1, d2});
      if (d2 === 0 || (d1 === 1 && d2 === 2)) {
        sum ++;
      }
    }
  }
  console.log({sum})
  return sum;
}

function part24(input) {
  const grid = input.split('\n').map(l => l.split(''));
  const h = grid.length, w = grid[0].length;
  const plots = {};
  for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) {
    const flower = grid[y][x];
    const plot = (plots[flower] ??= { l: 0, sides: 0 });
    plot.l++;
    for (let d = 0; d < DIRS.length; d++) {
      const [dx1, dy1] = DIRS[d];
      const [dx2, dy2] = DIRS[(d + 1) % 4];

      const d1 = 1 + (grid[y + (dy1 || dy2)]?.[x + (dx1 || dx2)] === flower);
      const d2 = (grid[y][x + (dx1 || dx2)] === flower) + (grid[y + (dy1 || dy2)]?.[x] === flower);
      // console.log({dx1, dy1, dx2, dy2});
      // console.log({d1, d2});
      if (d2 === 0 || (d1 === 1 && d2 === 2)) {
        plot.sides++;
      }
    }
  }
  return Object.values(plots).reduce((a, { l, sides }) => a + sides * l, 0);
}

// test(part2, `AAAA
// BBCD
// BBCC
// EEEC`)

const inputFile = 'inputs/2024/day-12.txt';
const sampleInput = `
AAAA
BBCD
BBCC
EEEC`.trim();
const sampleInput2 = `
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`.trim();
const sampleInput3 = `
EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`.trim();
const sampleInput4 = `
AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`.trim();

test(part1, sampleInput, 140);
test(part1, sampleInput2, 1930);
exec(part1, inputFile, 1402544);

test(part2, sampleInput, 80);
test(part2, sampleInput3, 236);
test(part2, sampleInput4, 368);
test(part2, sampleInput2, 1206);
exec(part2, inputFile, 862486);

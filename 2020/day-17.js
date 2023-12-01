function step(state) {
  const dim = state[0].length + 2;
  const next = new Array(dim).fill(new Array(dim)).fill(new Array(dim));

  for(let z = 0; z < next.length; z++)
  for(let y = 0; y < dim; y++)
  for(let x = 0; x < dim; x++) {
    const count =
        state[z][y][x    ]
      + state[z][y][x + 1]
      + state[z][y][x + 2]

      + state[z][y + 1][x    ]
      + state[z][y + 1][x + 1]
      + state[z][y + 1][x + 2]

      + state[z][y + 2][x    ]
      + state[z][y + 2][x + 1]
      + state[z][y + 2][x + 2]

      + state[z + 1][y][x    ]
      + state[z + 1][y][x + 1]
      + state[z + 1][y][x + 2]

      + state[z + 1][y + 1][x    ]
      // + state[z + 1][y + 1][x + 1]
      + state[z + 1][y + 1][x + 2]

      + state[z + 1][y + 2][x    ]
      + state[z + 1][y + 2][x + 1]
      + state[z + 1][y + 2][x + 2]

      + state[z + 2][y][x    ]
      + state[z + 2][y][x + 1]
      + state[z + 2][y][x + 2]

      + state[z + 2][y + 1][x    ]
      + state[z + 2][y + 1][x + 1]
      + state[z + 2][y + 1][x + 2]

      + state[z + 2][y + 2][x    ]
      + state[z + 2][y + 2][x + 1]
      + state[z + 2][y + 2][x + 2];

    next[z][y][x] = (count === 3 || (state[z + 1][y + 1][x + 1] && count === 2)) ? 1 : 0;
  }
}

function exec(input) {
  const plane = input.split('\n').map(s => s.split(',').map(x => x ? 1 : 0));
  const dim = plane.length + 2;
  let state = new Array(dim).fill(new Array);

  state = step(state);
  state = step(state);
  state = step(state);
  state = step(state);
  state = step(state);
  state = step(state);

  return state.flat().filter(Boolean).length;
}

exec(`.#.
..#
###`);

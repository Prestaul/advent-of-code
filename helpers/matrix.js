export const transpose = matrix => matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));

export const rotateClockwise = matrix => transpose(matrix.reverse());

export const rotateCounterClockwise = matrix => transpose(matrix).reverse();

export const flipHorizontal = matrix => matrix.map(row => row.slice().reverse());

export const flipVertical = matrix => matrix.slice().reverse();

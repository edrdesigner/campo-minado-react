// constant to perform operations that must be performed to
// access fields around a mine
const AROUND_CELL_OPERATORS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1],
];

// default mine letter
const MINE_ID = 'M';

export {
  AROUND_CELL_OPERATORS,
  MINE_ID
}

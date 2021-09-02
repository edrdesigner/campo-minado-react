import { AROUND_CELL_OPERATORS, MINE_ID } from "../constants/gameConstants";

export default class BoardModel {
  constructor({ rows, columns, mines }) {
    this.boardRowsLength = rows;
    this.boardColumnsLength = columns;
    this.minesLength = mines;
    this.board = [];
    this.minesPositions = [];
  }

  generateBoard() {
    this.generateEmptyBoardFrom();
    this.generateMinesPositions();
    this.insertMines();
    this.changeBoardNumbers();

    return this.board;
  }

  /**
   * @deprecated
   */
  generateEmptyBoard() {
    for (let y = 0; y < this.boardRowsLength; y++) {
      this.board.push([]);

      for (let x = 0; x < this.boardColumnsLength; x++) {
        this.board[y][x] = 0;
      }
    }
  }

  generateEmptyBoardFrom() {
    this.board = Array.from({ length: this.boardRowsLength })
      .fill(0)
      .map(() => Array.from({ length: this.boardColumnsLength }).fill(0));
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  isPositionMine(minePosition) {
    return this.minesPositions.join(" ").includes(minePosition.toString());
  }

  generateMinesPositions() {
    this.minesPositions = [];

    while (this.minesPositions.length < this.minesLength) {
      const y = this.getRandomNumber(0, this.boardRowsLength);
      const x = this.getRandomNumber(0, this.boardColumnsLength);

      if (!this.isPositionMine([y, x])) {
        this.minesPositions.push([y, x]);
      }
    }
  }

  insertMines() {
    for (let i = 0; i < this.minesPositions.length; i++) {
      const y = this.minesPositions[i][0];
      const x = this.minesPositions[i][1];
      this.board[y][x] = MINE_ID;
    }
  }

  changeBoardNumbers() {
    for (let i = 0; i < this.minesPositions.length; i++) {
      for (let j = 0; j < AROUND_CELL_OPERATORS.length; j++) {
        const minePosition = this.minesPositions[i];
        const around = AROUND_CELL_OPERATORS[j];
        const boardY = minePosition[0] + around[0];
        const boardX = minePosition[1] + around[1];

        if (
          boardY >= 0 &&
          boardY < this.boardRowsLength &&
          boardX >= 0 &&
          boardX < this.boardColumnsLength &&
          typeof this.board[boardY][boardX] === "number"
        ) {
          this.board[boardY][boardX]++;
        }
      }
    }
  }
}

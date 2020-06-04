class Game {
  static get status() {
    return {
      PRISTINE: 0,
      IN_PROGRESS: 1,
      GAME_OVER: 2,
      GAME_WON: 3,
    }
  }

  constructor(numRows = 8, numCols = 10, numMines = 10) {
    this.numRows = numRows
    this.numCols = numCols
    this.numMines = numMines

    this.board = createGrid(numRows, numCols, null)

    this.secretBoard = createGrid(numRows, numCols, 0)

    this.status = Game.status.PRISTINE
    this.cellsRevealed = 0
  }

  printBoard() {
    console.table(this.board)
  }

  printSecretBoard() {
    console.table(this.secretBoard)
  }

  placeMines(initialRow, initialCol) {
    let minesPlaced = 0
    while (minesPlaced < this.numMines) {
      let [row, col] = [randomInt(this.numRows), randomInt(this.numCols)]

      // chosen space cannot be the initial move or already contain mine
      if (
        (row === initialRow && col === initialCol) ||
        this.secretBoard[row][col] === -1
      )
        continue

      // place the mine and increment adjacent cells
      this.secretBoard[row][col] = -1
      this.adjacentCells(row, col).forEach(([r, c]) => {
        if (this.secretBoard[r][c] !== -1) this.secretBoard[r][c] += 1
      })
      minesPlaced += 1
    }
  }

  // given a cell (row, col), return array of adjacent cells, staying within bounds
  // there will be at most 8 of these, for each cardinal direction
  adjacentCells(row, col) {
    return [
      [row - 1, col - 1], // top-left
      [row - 1, col], // top
      [row - 1, col + 1], // top-right
      [row, col - 1], // left
      [row, col + 1], // right
      [row + 1, col - 1], // bottom-left
      [row + 1, col], // bottom
      [row + 1, col + 1], // bottom-right
    ].filter(
      ([r, c]) => 0 <= r && r < this.numRows && 0 <= c && c < this.numCols
    )
  }

  revealCell(row, col) {
    // Do not place mines until first move
    // First cell revealed can never contain mine
    if (this.status === Game.status.PRISTINE) {
      this.placeMines(row, col)
      this.status = Game.status.IN_PROGRESS
    }
    let revealed = this.secretBoard[row][col]
    this.board[row][col] = revealed
    this.cellsRevealed += 1
    if (revealed == 0) {
      for (let [r, c] of this.adjacentCells(row, col)) {
        if (this.board[r][c] === null) this.revealCell(r, c)
      }
    } else if (revealed === -1) {
      this.status = Game.status.GAME_OVER
    }

    if (this.cellsRevealed === (this.numRows * this.numCols - this.numMines)) {
      this.status = Game.status.GAME_WON
    }
  }
}

function createGrid(rows, columns, fill) {
  let grid = new Array(rows)
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(columns).fill(fill)
  }
  return grid
}

// Returns random integer from 0 to n
const randomInt = (n) => Math.floor(Math.random() * n)

module.exports = Game

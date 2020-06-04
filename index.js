const readline = require('readline')

const Game = require('./game')

if (require.main === module) {
  const game = new Game()

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Move: ',
  })

  console.clear()
  game.printBoard()
  rl.prompt()

  rl.on('line', (line) => {
    let [row, col] = line
      .trim()
      .split(',')
      .map((x) => Number(x))

    game.revealCell(row, col)
    console.clear()
    game.printBoard()

    if (game.status === Game.status.GAME_OVER) {
      console.log('You lose!')
      console.log('Thanks for playing!')
      process.exit(0)
    } else if (game.status === Game.status.GAME_WON) {
      console.log('You win!')
      console.log('Thanks for playing!')
      process.exit(0)
    }

    rl.prompt()
  }).on('close', () => {
    console.log('\nThanks for playing!')
    process.exit(0)
  })
}

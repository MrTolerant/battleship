import React, { useState, useEffect } from 'react'

import Board from './Board'
import initialGame from './initialGame.js'

const shipsCount = initialGame.flat().reduce((acc, rec) => (rec.ship ? (acc += 1) : acc), 0)

const initialState = {
  shots: shipsCount + 3,
  hits: 0,
  grid: [...initialGame]
}

const BoardContainer = () => {
  const [game, setGame] = useState(initialState)

  useEffect(() => {
    console.log('game', game)
  }, [game])

  const onClick = (x, y) => {
    const { shots, hits, grid } = game
    if (!grid[x][y].hit) {
      console.log('before', grid[x][y])
      grid[x][y].hit = true
      if (grid[x][y].ship) {
        console.warn('YAHOOOOOO')
        setGame({ ...game, hits: hits + 1 })
      }
      setGame({ ...game, grid: grid, shots: shots - 1 })
      console.log('after', grid[x][y])
    }
  }

  const restart = () => setGame(initialState)
  const { grid, shots, hits } = game

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-2xl p-2">
        shots: <span data-testid="shots">{shots}</span> | hits: <span data-testid="hits">{hits}</span>
      </div>
      {hits < shipsCount && shots === 0 && (
        <>
          <div className="text-3xl">You lose =(</div>
          <button onClick={restart}>restart</button>
        </>
      )}
      {hits === shipsCount && shots === 3 && (
        <>
          <div className="text-3xl">You win =)</div>
          <button className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={restart}>
            restart
          </button>
        </>
      )}
      {hits < shipsCount && shots > 0 && <Board onClick={onClick} grid={grid} />}
    </div>
  )
}

export default BoardContainer

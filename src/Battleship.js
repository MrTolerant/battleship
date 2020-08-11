import React, {useState} from 'react'

import Board from './Board'
import initialGame from './grid.json'

const shipsCount = initialGame.flat().reduce((acc,rec)=>rec.ship ? acc += 1 : acc,0)

const initialState = {
  shots: shipsCount + 3,
  hits: 0,
  grid: [...initialGame]
}

const BoardContainer = () =>  {
const [game, setGame] =useState(initialState)

const  onClick = (x,y) => {
    const { shots, hits } = game
    let grid = [...game.grid]
    grid[x][y].hit = true

    if (grid[x][y].ship) setGame({...game, hits: hits + 1} )

    setGame({ ...game, grid: grid, shots: shots - 1 })
  }

const  restart = () => setGame(initialState)
const { grid, shots, hits } = game


    return (
      <div className="game-container">
        <h2>
           shots: <span data-testid="shots">{shots}</span> | hits: <span data-testid="hits">{hits}</span>
        </h2>
        {hits < shipsCount && shots === 0 && (
          <>
            <h3>You lose =(</h3>
            <button onClick={restart}>restart</button>
          </>
        )}
        {hits === shipsCount && shots === 3 && (
          <>
            <h3>You win =)</h3>
            <button onClick={restart}>restart</button>
          </>
        )}
        {hits < shipsCount && shots > 0 && <Board onClick={onClick} grid={grid} />}
      </div>
    )
  }

export default BoardContainer

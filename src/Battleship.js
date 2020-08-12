import React, { useState, useEffect } from 'react'

import Board from './Board'
import initialGrid from './initialGame.js'

const shipsCount = initialGrid.flat().reduce((acc, rec) => (rec.ship ? (acc += 1) : acc), 0)
const minimumShots = 3
const initialState = {
  shots: shipsCount + minimumShots,
  hits: 0,
}

const BoardContainer = () => {
  const [shots, setShots] = useState(initialState.shots)
  const [hits, setHits] = useState(initialState.hits)
  const [grid, setGrid] = useState(JSON.parse(JSON.stringify(initialGrid)))

  useEffect(() => {
    console.log('grid', grid)
  }, [grid])

  const onClick = (x, y) => {
    if (!grid[x][y].hit) {
      grid[x][y].hit = true
      if (grid[x][y].ship) setHits(hits + 1)
      setShots(shots - 1)
    }
  }

  const restart = () => {
    setShots(initialState.shots)
    setHits(initialState.hits)
    setGrid(JSON.parse(JSON.stringify(initialGrid)))
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-2xl p-2 flex flex-row w-full justify-between">
        <div className="mx-2">shots: {shots}</div> <div className="mx-2">hits: {hits}</div>
      </div>
      {hits < shipsCount && shots === 0 && (
        <>
          <div className="text-3xl">You lose =(</div>
          <button className="m-2 bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={restart}>
            restart
          </button>
        </>
      )}
      {hits === shipsCount && shots === minimumShots && (
        <>
          <div className="text-3xl">You win =)</div>
          <button className="m-2 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={restart}>
            restart
          </button>
        </>
      )}
      {hits < shipsCount && shots > 0 && <Board onClick={onClick} grid={grid} />}
    </div>
  )
}

export default BoardContainer

import React, { useState, useEffect } from 'react'

import Board from './Board'
// import initialGrid from './initialGame.js'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

const randomGrid = (gridSize) => {
  let grid = []
  for (let x = 0; x < gridSize; x += 1) {
    grid = [...grid, []]
    for (let y = 0; y < gridSize; y += 1) {
      grid[x] = [...grid[x], { ship: getRandomInt(2), hit: 0 }]
    }
  }
  return grid
}

const BoardContainer = () => {
  const gridSize = 14

  const [grid, setGrid] = useState(randomGrid(gridSize))
  const shipsCount = grid.flat().reduce((acc, rec) => (rec.ship ? (acc += 1) : acc), 0)
  const maxMiss = 5
  const initialState = {
    shots: shipsCount + maxMiss,
    hits: 0
  }
  const [shots, setShots] = useState(initialState.shots)
  const [hits, setHits] = useState(initialState.hits)

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
    setGrid(randomGrid(gridSize))
  }
  return (
    <div className="flex flex-col">
      <div className="text-2xl flex flex-row w-56">
        <div className="p-2">shots: {shots}</div> <div className="ml-auto p-2">hits: {hits}</div>
      </div>
      <div className="flex flex-col items-center p-2">
        {hits < shipsCount && shots === 0 && (
          <>
            <div className="text-3xl">You lose =(</div>
            <button className="m-2 bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={restart}>
              restart
            </button>
          </>
        )}
        {hits === shipsCount && (
          <>
            <div className="text-3xl">You win =)</div>
            <button className="m-2 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={restart}>
              restart
            </button>
          </>
        )}
        {hits < shipsCount && shots > 0 && <Board onClick={onClick} grid={grid} />}
      </div>
    </div>
  )
}

export default BoardContainer

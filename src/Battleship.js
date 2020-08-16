import React, { useState, useEffect } from 'react'

import Board from './Board'
// import initialGrid from './initialGame.js'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

const BoardContainer = () => {
  const randomGrid = (gridSize, shipsCount) => {
    let grid = []
    const ships = new Array(shipsCount).fill(null).map((ship) => `${getRandomInt(gridSize)}-${getRandomInt(gridSize)}`)
    for (let x = 0; x < gridSize; x += 1) {
      grid = [...grid, []]
      for (let y = 0; y < gridSize; y += 1) {
        grid[x] = [...grid[x], { ship: ships.includes(`${x}-${y}`) ? 1 : 0, hit: 0 }]
      }
    }
    console.log('ships', ships)
    console.log('grid', grid)
    return grid
  }

  const gridSize = 10
  const shipsCount = 10 // grid.flat().reduce((acc, rec) => (rec.ship ? (acc += 1) : acc), 0)
  const [grid, setGrid] = useState(randomGrid(gridSize, shipsCount))
  const maxMiss = 5
  const initialState = {
    shots: shipsCount + maxMiss,
    hits: 0
  }
  const [shots, setShots] = useState(initialState.shots)
  const [hits, setHits] = useState(initialState.hits)

  const addShip = () => {}

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
    setGrid(randomGrid(gridSize, shipsCount))
  }
  return (
    <div className="flex flex-col">
      <div className="text-2xl flex flex-row w-full">
        <div className="p-2">shots: {shots}</div> <div className="ml-auto p-2">hits: {hits}</div> <div className="ml-auto p-2">ships: {shipsCount - hits}</div>
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
      {hits < shipsCount && shots > 0 && (
        <>
          <button className="m-2 bg-yellow-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" onClick={addShip}>
            AddShip
          </button>
          <button className="m-2 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={restart}>
            restart
          </button>
        </>
      )}
    </div>
  )
}

export default BoardContainer

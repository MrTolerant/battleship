import React, { useState, useEffect, useCallback } from 'react'

import Board from './Board'
// import initialGrid from './initialGame.js'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

const BoardContainer = () => {
  const [ships, setShips] = useState([])

  const addShips = (count = 1) => {
    let newShips = []
    for (let i = 1; i < count; i += 1) {
      const startPos = { x: getRandomInt(gridSize), y: getRandomInt(gridSize) }
      const length = getRandomInt(3) + 2
      const direction = getRandomInt(20) ? 'vertical' : 'horizontal'
      newShips = [...newShips, { startPos, length, direction }]
      console.log('new ships', newShips)
    }
    setShips([...newShips])
    console.log('add ship')
  }

  const randomGrid = (gridSize, shipsCount) => {
    let grid = []
    for (let x = 0; x < gridSize; x += 1) {
      grid = [...grid, []]
      for (let y = 0; y < gridSize; y += 1) {
        grid[x] = [...grid[x], { ship: 0, hit: 0, inactive: false }]
      }
    }

    return grid
  }

  useEffect(() => {
    addShips(shipsCount)
  }, [])

  useEffect(() => {
    putShips()
  }, [ships])

  const gridSize = 10
  const shipsCount = 10 // grid.flat().reduce((acc, rec) => (rec.ship ? (acc += 1) : acc), 0)
  const [grid, setGrid] = useState(randomGrid(gridSize, shipsCount))
  const maxMiss = 5
  const initialState = {
    shots: ships.length + maxMiss,
    hits: 0
  }
  const [shots, setShots] = useState(initialState.shots)
  const [hits, setHits] = useState(initialState.hits)

  const putShips = () => {
    let newGrid = grid
    ships.forEach((ship) => {
      const { x, y } = ship.startPos
      if (ship.direction === 'vertical') {
        if (y + ship.length <= gridSize) {
          for (let i = y; i < y + ship.length; i += 1) {
            newGrid[x][i].ship = 1
          }
        } else {
          for (let i = y; i > y - ship.length; i -= 1) {
            newGrid[x][i].ship = 1
          }
        }
      } else {
        if (x + ship.length <= gridSize) {
          for (let i = x; i < x + ship.length; i += 1) {
            newGrid[x][i].ship = 1
          }
        } else {
          for (let i = x; i > x - ship.length; i -= 1) {
            newGrid[x][i].ship = 1
          }
        }
      }
    })
    setGrid([...newGrid])
    console.log('new ships', grid)
  }

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
    addShips(shipsCount)
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
          {/* <button className="transition duration-500 ease-in-out m-2 bg-yellow-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" onClick={addShip}>
            AddShip
          </button> */}
          <button className="transition duration-500 ease-in-out m-2 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={restart}>
            restart
          </button>
        </>
      )}
    </div>
  )
}

export default BoardContainer

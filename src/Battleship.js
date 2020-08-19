import React, { useState, useEffect, useCallback } from 'react'

import Board from './Board'
// import initialGrid from './initialGame.js'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

const BoardContainer = () => {
  const maxMiss = 5
  const [ships, setShips] = useState([])
  const gridSize = 10
  const shipsCount = 10
  const [shots, setShots] = useState(0)
  const [hits, setHits] = useState(0)
  const [aliveShips, setAliveShips] = useState(0)

  const restart = useCallback(() => {
    // setShots(0)
    setHits(0)
    setGrid(emptyGrid(gridSize))
    addShips(shipsCount)
  }, [])

  const emptyGrid = useCallback(
    (gridSize) => {
      let grid = []
      for (let x = 0; x < gridSize; x += 1) {
        grid = [...grid, []]
        for (let y = 0; y < gridSize; y += 1) {
          grid[x] = [...grid[x], { ship: 0, hit: 0, inactive: false }]
        }
      }
      return grid
    },
    [hits, shots]
  )

  // useEffect(() => {
  //   set
  // }, [grid])

  const [grid, setGrid] = useState(emptyGrid(gridSize, shipsCount))

  const addShips = (count = 1) => {
    let newShips = []
    for (let i = 1; i <= count; i += 1) {
      const startPos = { x: getRandomInt(gridSize), y: getRandomInt(gridSize) }
      const length = getRandomInt(3) + 2
      const direction = getRandomInt(2) ? 'vertical' : 'horizontal'
      newShips = [...newShips, { startPos, length, direction, lives: length, alive: true, cells: [] }]
    }
    console.log('add ships func', newShips)

    setShips([...newShips])
    console.log('add ship')
  }

  useEffect(() => {
    addShips(shipsCount)
    console.log('add ships useffect')
  }, [])

  useEffect(() => {
    putShips()
    console.log('put ships useffect')
  }, [ships])

  const putShips = () => {
    let newGrid = grid
    ships.forEach((ship) => {
      const { x, y } = ship.startPos
      if (ship.direction === 'horizontal') {
        if (y + ship.length <= gridSize) {
          for (let i = y; i < y + ship.length; i += 1) {
            newGrid[x][i].ship = 1
            ship.cells.push(`${x}_${i}`)
          }
        } else {
          for (let i = y; i > y - ship.length; i -= 1) {
            newGrid[x][i].ship = 1
            ship.cells.push(`${x}_${i}`)
          }
        }
      } else {
        if (x + ship.length <= gridSize) {
          for (let i = x; i < x + ship.length; i += 1) {
            newGrid[i][y].ship = 1
            ship.cells.push(`${i}_${y}`)
          }
        } else {
          for (let i = x; i > x - ship.length; i -= 1) {
            newGrid[i][y].ship = 1
            ship.cells.push(`${i}_${y}`)
          }
        }
      }
    })
    setGrid([...newGrid])
    console.log('new ships', grid)
  }

  const onClick = (x, y) => {
    console.log('click', x, y)
    if (!grid[x][y].hit) {
      grid[x][y].hit = true
      if (grid[x][y].ship) {
        const newShips = ships.map((ship) => {
          if (ship.cells.includes(`${x}_${y}`)) {
            ship.lives -= 1
            if (ship.lives === 0) ship.alive = false
            console.log('fired', ship)
            return ship
          }
          return ship
        })
        setShips(newShips)
        grid[x][y].lives -= 1
        setHits(hits + 1)
      }
      setShots(shots - 1)
    }
  }

  useEffect(() => {
    setAliveShips(ships.reduce((acc, ship) => (ship.alive ? (acc += 1) : acc), 0))
  }, [ships])

  useEffect(() => {
    setShots(ships.reduce((acc, rec) => acc + rec.lives, 0) + maxMiss)
    setHits(0)
    console.log('restart or grid')
  }, [restart, grid])

  return (
    <div className="flex flex-col">
      <div className="text-2xl flex flex-row w-full">
        <div className="p-2">shots: {shots}</div> <div className="ml-auto p-2">hits: {hits}</div> <div className="ml-auto p-2">ships: {aliveShips}</div>
      </div>
      <div className="flex flex-col items-center p-2">
        {aliveShips < 0 && shots === 0 && (
          <>
            <div className="text-3xl">You lose =(</div>
            <button className="m-2 bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={restart}>
              restart
            </button>
          </>
        )}
        {aliveShips === 0 && (
          <>
            <div className="text-3xl">You win =)</div>
            {/* <button className="m-2 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={restart}>
              restart
            </button> */}
          </>
        )}
        {aliveShips > 0 && shots > 0 && <Board onClick={onClick} grid={grid} />}
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

export default React.memo(BoardContainer)

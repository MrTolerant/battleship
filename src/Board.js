import React from 'react'
import PropTypes from 'prop-types'

const Board = ({ onClick, grid }) => {
  const getColor = ({hit, ship}) =>{
    if (ship && !hit) return "bg-blue-500" //remove
    if (!hit) return ""
    if (!ship && hit) return "bg-gray-700"
    if (ship && hit)  return "bg-red-500"
  }

  return (
    <div className="flex flex-row">
    <div className="flex flex-col">
      {grid.map((row, x) => (
        <div className="flex flex-row" key={x}>
          {row.map(({hit, ship}, y) => <div className={`${getColor({hit, ship})} flex flex-col w-10 h-10 border-gray-700 rounded border-2 text-center mb-1 mr-1`} key={y} onClick={() => onClick(x,y)} />
          )}
        </div>
      ))}
    </div>
    </div>
  )
}

Board.propTypes = {
  onCLick: PropTypes.func.isRequired,
  grid: PropTypes.array.isRequired
}

Board.defaultProps = {
  grid: []
}

export default Board

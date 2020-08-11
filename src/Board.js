import React from 'react'
import PropTypes from 'prop-types'

const Board = ({ onClick, grid }) => {
  return (
    <div data-testid="board" className="board">
      {grid.map((row, x) => (
        <div className="row" key={x}>
          {row.map(({hit, ship}, y) => (
            <div className="col" key={y} onClick={() => onClick(x,y)}>
              {!hit && <span>.</span>}
              {/* Убрать */}
              {ship && <span>?</span>} 
              {/* Убрать */}
              {!ship && hit  && <span>o</span>}
              {ship && hit  && <span>X</span>}
            </div>
          ))}
        </div>
      ))}
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

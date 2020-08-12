import React from 'react'

import Battleship from './Battleship'

function App() {
  return (
    <div className="relative h-screen flex flex-col bg-opacity-50 bg-black text-gray-100 justify-center items-center antialiased">
      <div className="flex flex-row text-6xl">Battleship</div>
    <div className="flex flex-row rounded shadow-lg m-auto p-6">
      <Battleship />
    </div>
    </div>
  )
}

export default App

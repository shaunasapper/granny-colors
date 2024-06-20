import React from 'react'
import logo from './logo.svg'
import { Palette } from './components/Palette'
import { GrannySquare } from './components/GrannySquare'
import { ALL_YARN_COLORS } from './constants/colors'
import { GeneratedSquares } from './components/GeneratedSquares'

function App() {
  return (
    <div className="p-10 flex flex-col gap-3 items-center w-screen h-screen">
      <h1 className="text-sky-800 text-5xl font-bold text-center">
        these ain't your granny's squares
      </h1>
      <Palette />
      <GeneratedSquares />
    </div>
  )
}

export default App

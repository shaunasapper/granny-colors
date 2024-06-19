import { ExitStatus } from 'typescript'
import { ALL_YARN_COLORS, colorPalette } from '../constants/colors'
import { GrannySquare } from './GrannySquare'
import _ from 'lodash'
import * as React from 'react'
import { generateColors } from '../actions/generateColors'

export function GeneratedSquares() {
  const test = [
    ALL_YARN_COLORS.lightGreen,
    ALL_YARN_COLORS.yellow,
    ALL_YARN_COLORS.orange,
    ALL_YARN_COLORS.darkGreen,
  ]
  const [graph, setGraph] = React.useState<string[][][]>([])

  const rows = 5
  const columns = 5
  const numColors = 4

  // const graph = [
  //   [[1,2,3,4], [1,2,3,4], [1,2,3,4], [1,2,3,4]],
  //   [[1,2,3,4], [1,2,3,4], [1,2,3,4], [1,2,3,4]],
  //   [[1,2,3,4], [1,2,3,4], [1,2,3,4], [1,2,3,4]],
  //   [[1,2,3,4], [1,2,3,4], [1,2,3,4], [1,2,3,4]],
  // ]

  const handleGenerateSquares = () => {
    let g: string[][][] = []
    for (let i = 0; i < rows; i++) {
      g.push([])
    }
    g.forEach((row) => {
      for (let i = 0; i < columns; i++) {
        // TODO: do some fucking graph theory
        // row.push(_.sampleSize(colorPalette, numColors))
        row.push([])
      }
    })
    generateColors(g, colorPalette)
    setGraph(g)
  }

  return (
    <>
      <button
        className={`p-3 rounded-lg text-amber-50 font-semibold bg-sky-800 hover:bg-sky-700`}
        onClick={handleGenerateSquares}
      >
        gimme some squares, granny
      </button>
      <div
        style={{
          maxWidth: '80%',
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
      >
        {graph.map((row, x) =>
          row.map((square, y) => (
            <GrannySquare key={`square-${x}-${y}`} colors={square} />
          ))
        )}
      </div>
    </>
  )
}

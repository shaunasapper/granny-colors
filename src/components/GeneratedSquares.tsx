import { ExitStatus } from 'typescript'
import { ALL_YARN_COLORS, colorPalette } from '../constants/colors'
import { GrannySquare } from './GrannySquare'
import _ from 'lodash'
import * as React from 'react'

export function GeneratedSquares() {
  const test = [
    ALL_YARN_COLORS.lightGreen,
    ALL_YARN_COLORS.yellow,
    ALL_YARN_COLORS.orange,
    ALL_YARN_COLORS.darkGreen,
  ]
  const [graph, setGraph] = React.useState<string[][][]>([])

  const rows = 10
  const columns = 10

  // const graph = [
  //   [test, test, test, test],
  //   [test, test, test, test],
  //   [test, test, test, test],
  //   [test, test, test, test],
  // ]

  const handleGenerateSquares = () => {
    let g: string[][][] = []
    for (let i = 0; i < rows; i++) {
      g.push([])
    }
    g.forEach((row) => {
      for (let i = 0; i < columns; i++) {
        // TODO: do some fucking graph theory
        row.push(_.sampleSize(colorPalette, 4))
      }
    })
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
        {graph.map((row) =>
          row.map((square) => <GrannySquare colors={square} />)
        )}
      </div>
    </>
  )
}

import { ExitStatus } from 'typescript'
import { ALL_YARN_COLORS, colorPalette } from '../constants/colors'
import { GrannySquare, Square } from './GrannySquare'
import _ from 'lodash'
import * as React from 'react'
import { generateColors } from '../actions/generateColors'

export type GrannySquareGraph = Square[][]

export function GeneratedSquares() {
  const test = [
    ALL_YARN_COLORS.lightGreen,
    ALL_YARN_COLORS.yellow,
    ALL_YARN_COLORS.orange,
    ALL_YARN_COLORS.darkGreen,
  ]
  const [graph, setGraph] = React.useState<GrannySquareGraph>([])
  const [rows, setRows] = React.useState(5)
  const [columns, setColumns] = React.useState(5)
  const [colorsPerSquare, setColorsPerSquare] = React.useState(4)

  React.useEffect(() => {
    const localGraph = localStorage.getItem('graph')
    if (localGraph) {
      setGraph(JSON.parse(localGraph))
    }
  }, [])

  React.useEffect(() => {
    if (graph.length > 0) {
      localStorage.setItem('graph', JSON.stringify(graph))
    }
  }, [graph])

  // const graph = [
  //   [[1,2,3,4], [1,2,3,4], [1,2,3,4], [1,2,3,4]],
  //   [[1,2,3,4], [1,2,3,4], [1,2,3,4], [1,2,3,4]],
  //   [[1,2,3,4], [1,2,3,4], [1,2,3,4], [1,2,3,4]],
  //   [[1,2,3,4], [1,2,3,4], [1,2,3,4], [1,2,3,4]],
  // ]
  function buildGraph(g: GrannySquareGraph) {
    for (let i = 0; i < rows; i++) {
      g.push([])
    }
    g.forEach((row) => {
      for (let i = 0; i < columns; i++) {
        // TODO: do some fucking graph theory
        // row.push(_.sampleSize(colorPalette, numColors))
        row.push({ colors: new Array<string>() })
      }
    })
  }

  React.useEffect(() => {
    let g: GrannySquareGraph = []
    buildGraph(g)
    generateColors(g, colorPalette, colorsPerSquare)
    localStorage.setItem('graph', JSON.stringify(g))
    setGraph(g)
  }, [rows, columns, colorsPerSquare])

  const handleGenerateSquares = React.useCallback(() => {
    let g: GrannySquareGraph = []
    buildGraph(g)
    generateColors(g, colorPalette, colorsPerSquare)
    localStorage.setItem('graph', JSON.stringify(g))
    setGraph(g)
  }, [rows, columns, colorsPerSquare])

  console.log(graph)

  return (
    <>
      <form className="flex gap-3">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <label htmlFor="rows" className="font-semibold">
            rows
          </label>
          <input
            name="rows"
            type="number"
            placeholder="number of rows"
            value={rows}
            onChange={(e) => setRows(e.target.valueAsNumber)}
            className="border rounded px-3 py-1 w-36"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <label htmlFor="columns" className="font-semibold">
            columns
          </label>
          <input
            name="columns"
            type="number"
            placeholder="number of columns"
            value={columns}
            onChange={(e) => setColumns(e.target.valueAsNumber)}
            className="border rounded px-3 py-1 w-36"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <label htmlFor="colorsPerSquare" className="font-semibold">
            colors per square
          </label>
          <input
            name="colorsPerSquare"
            type="number"
            placeholder="number of colors per granny square"
            value={colorsPerSquare}
            onChange={(e) => setColorsPerSquare(e.target.valueAsNumber)}
            className="border rounded px-3 py-1 w-36"
          />
        </div>
      </form>
      <button
        className={`p-3 rounded-lg text-amber-50 font-semibold bg-sky-800 hover:bg-sky-700`}
        onClick={handleGenerateSquares}
      >
        new squares pls
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
      >
        {graph.map((row, x) =>
          row.map((square, y) => (
            <GrannySquare
              key={`square-${x}-${y}`}
              square={square}
              numColors={colorsPerSquare}
            />
          ))
        )}
      </div>
    </>
  )
}

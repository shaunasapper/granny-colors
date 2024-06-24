import { ExitStatus } from 'typescript'
import { ALL_YARN_COLORS, colorPalette } from '../constants/colors'
import { GrannySquare, Square } from './GrannySquare'
import _ from 'lodash'
import * as React from 'react'
import { generateColors } from '../actions/generateColors'

export type GrannySquareGraph = Square[][]
export type GraphData = {
  rows: number
  columns: number
  colorsPerSquare: number
}

export function GeneratedSquares() {
  const [graph, setGraph] = React.useState<GrannySquareGraph>(() => {
    const saved = localStorage.getItem('graph')
    return saved ? JSON.parse(saved) : []
  })
  const [graphData, setGraphData] = React.useState<GraphData>(() => {
    const saved = localStorage.getItem('graphData')
    return saved
      ? JSON.parse(saved)
      : {
          rows: 5,
          columns: 5,
          colorsPerSquare: 4,
        }
  })
  const { rows, columns, colorsPerSquare } = graphData

  function buildGraph(g: GrannySquareGraph) {
    for (let i = 0; i < rows; i++) {
      g.push([])
    }
    g.forEach((row) => {
      for (let i = 0; i < columns; i++) {
        row.push({ colors: new Array<string>() })
      }
    })
  }

  // yeah yeah this could be cleaner and be extracted out into a hook or
  // whatever but these are granny squares, who cares
  React.useEffect(() => {
    if (graph.length > 0) {
      localStorage.setItem('graph', JSON.stringify(graph))
    }
  }, [graph])

  React.useEffect(() => {
    localStorage.setItem('graphData', JSON.stringify(graphData))
  }, [graphData])

  // this is what makes the form reactive, but it breaks the local storage
  // saving since the state is reset on every render
  // React.useEffect(() => {
  //   handleGenerateSquares()
  // }, [rows, columns, colorsPerSquare])

  const handleGenerateSquares = React.useCallback(() => {
    let g: GrannySquareGraph = []
    buildGraph(g)
    generateColors(g, colorPalette, colorsPerSquare)
    localStorage.setItem('graph', JSON.stringify(g))
    setGraph(g)
  }, [rows, columns, colorsPerSquare])

  return (
    <>
      <form className="flex gap-3">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* yeah yeah this is a lot of duplicated shit whatever i know it could be better */}
          <label htmlFor="rows" className="font-semibold">
            rows
          </label>
          <input
            name="rows"
            type="number"
            placeholder="number of rows"
            value={rows}
            onChange={(e) => {
              setGraphData((p) => ({ ...p, rows: e.target.valueAsNumber }))
            }}
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
            onChange={(e) =>
              setGraphData((p) => ({ ...p, columns: e.target.valueAsNumber }))
            }
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
            onChange={(e) =>
              setGraphData((p) => ({
                ...p,
                colorsPerSquare: e.target.valueAsNumber,
              }))
            }
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
              onClick={() =>
                setGraph((prev) => {
                  const g = [...prev]
                  g[x][y].isDone = !g[x][y].isDone
                  return g
                })
              }
              square={square}
              numColors={colorsPerSquare}
            />
          ))
        )}
      </div>
    </>
  )
}

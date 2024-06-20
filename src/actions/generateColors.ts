import _ from 'lodash'
import { GrannySquareGraph } from '../components/GeneratedSquares'
import { Square } from '../components/GrannySquare'
import { colorWeights } from '../constants/colors'

// const graph = [
//   [[1,2,3,4], [1,2,3,4], [1,2,3,4], [1,2,3,4]],
//   [[1,2,3,4], [1,2,3,4], [1,2,3,4], [1,2,3,4]],
//   [[1,2,3,4], [1,2,3,4], [1,2,3,4], [1,2,3,4]],
//   [[1,2,3,4], [1,2,3,4], [1,2,3,4], [1,2,3,4]],
// ]

// TODO: figure out how to evenly distribute colors
export function generateColors(
  graph: GrannySquareGraph,
  colors: string[],
  colorsPerSquare: number
) {
  graph.forEach((row, x) => {
    // set base colors
    row.forEach((square, y) => {
      if (square.colors.length === colorsPerSquare) {
        return
      }

      if (!square.colors.length) {
        const neighborColors = getNeighborColors(graph, x, y, 0)
        addColorToSquare(
          square,
          getRandomColor(colors, { exclude: neighborColors })
        )
      }
    })

    // set inner colors
    row.forEach((square, y) => {
      for (let i = 1; i < colorsPerSquare; i++) {
        // each ring should not be repeated on a neighbor
        // for example, neighboring squares should not both have dark blue middles
        const exclude = _.union(
          getNeighborColors(graph, x, y, i),
          square.colors
        )

        addColorToSquare(square, getRandomColor(colors, { exclude }))
      }
    })
  })
}

function addColorToSquare(square: Square, color: string) {
  if (!color) {
    throw new Error("hmm that probably shouldn't happen")
  } else {
    square.colors.push(color)
  }
}

function getRandomColor(colors: string[], { exclude }: { exclude: string[] }) {
  const possibleColors = _.difference(colors, exclude)

  // get weights for each possible color
  let weights: number[] = []
  possibleColors.map((c) => weights.push(colorWeights[c]))

  return weightedRandom(possibleColors, weights)
}

// https://stackoverflow.com/a/55671924
function weightedRandom(items: string[], weights: number[]) {
  let i

  for (i = 1; i < weights.length; i++) {
    weights[i] += weights[i - 1]
  }

  const random = Math.random() * weights[weights.length - 1]

  for (i = 0; i < weights.length; i++) {
    if (weights[i] > random) {
      break
    }
  }

  return items[i]
}

function getNeighborColors(
  graph: GrannySquareGraph,
  x: number,
  y: number,
  colorIndex: number
): string[] {
  const neighbors = [
    [x - 1, y - 1], // top left
    [x - 1, y], // top
    [x - 1, y + 1], // top right
    [x, y + 1], // right
    [x + 1, y + 1], // bottom right
    [x + 1, y], // bottom
    [x + 1, y - 1], // bottom left
    [x, y - 1], // left
  ]

  return _.compact(
    _.flatMap(neighbors, ([nx, ny]) =>
      getColorFromSquare(graph[nx]?.[ny]?.colors, colorIndex)
    )
  )
}

const getColorFromSquare = (colors: string[] | undefined, colorIndex: number) =>
  colors?.[colorIndex]

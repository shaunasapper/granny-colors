// sorta kinda a graph coloring implementation
// https://gist.github.com/themindfuldev/98df011211b8cbbc2405d41682799df0

import _ from 'lodash'
import { colorWeights } from '../constants/colors'

// const graph = [
//   [[1,2,3,4], [1,2,3,4], [1,2,3,4], [1,2,3,4]],
//   [[1,2,3,4], [1,2,3,4], [1,2,3,4], [1,2,3,4]],
//   [[1,2,3,4], [1,2,3,4], [1,2,3,4], [1,2,3,4]],
//   [[1,2,3,4], [1,2,3,4], [1,2,3,4], [1,2,3,4]],
// ]

// TODO: figure out how to evenly distribute colors
export function generateColors(graph: string[][][], colors: string[]) {
  graph.forEach((row, x) => {
    row.forEach((item, y) => {
      if (!item.length) {
        const neighborColors = getNeighborColors(graph, x, y)
        const color = getRandomColor(colors, neighborColors)
        if (!color) {
          console.error("hm that probably shouldn't happen")
        } else {
          item.push(color)
        }
      }
    })
  })
}

function getRandomColor(colors: string[], excludeColors: string[]) {
  const possibleColors = _.difference(colors, excludeColors)

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
  graph: string[][][],
  x: number,
  y: number
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
    _.flatMap(neighbors, ([nx, ny]) => getColorFromSquare(graph[nx]?.[ny]))
  )
}

const getColorFromSquare = (square: string[] | undefined) => square?.[0]

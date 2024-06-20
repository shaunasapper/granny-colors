import { useState } from 'react'
import { ALL_YARN_COLORS } from '../constants/colors'

const GRANNY_SIZE = 80

export type Square = {
  colors: string[]
  isDone?: boolean
}

export function GrannySquare({
  square,
  numColors,
}: {
  square: Square
  numColors: number
}) {
  const { colors, isDone } = square
  const [isHovering, setIsHovering] = useState(false)
  const opacity = isDone ? 'opacity-50' : 'opacity-100'
  const colorWidth = numColors === 1 ? 20 : GRANNY_SIZE / numColors
  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => (square.isDone = !square.isDone)}
      className={`flex justify-center items-center hover:opacity-80 active:opacity-70 ${opacity}`}
      style={{
        width: GRANNY_SIZE + 20,
        height: GRANNY_SIZE + 20,
        background: ALL_YARN_COLORS.brown,
        cursor: isHovering ? 'pointer' : 'default',
      }}
    >
      {colors.map((color, idx) => (
        <div
          key={`color-${color}-${idx}`}
          className="rounded absolute"
          style={{
            width: GRANNY_SIZE - idx * colorWidth,
            height: GRANNY_SIZE - idx * colorWidth,
            background: color,
          }}
        />
      ))}
    </div>
  )
}

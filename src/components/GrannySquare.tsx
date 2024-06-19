import { ALL_YARN_COLORS } from '../constants/colors'

const GRANNY_SIZE = 80

export function GrannySquare({ colors }: { colors: string[] }) {
  return (
    <div
      className="flex justify-center items-center"
      style={{
        width: GRANNY_SIZE + 20,
        height: GRANNY_SIZE + 20,
        background: ALL_YARN_COLORS.brown,
      }}
    >
      {colors.map((color, idx) => (
        <div
          key={`color-${color}-${idx}`}
          className="rounded absolute"
          style={{
            width: GRANNY_SIZE - idx * 20,
            height: GRANNY_SIZE - idx * 20,
            background: color,
          }}
        />
      ))}
    </div>
  )
}

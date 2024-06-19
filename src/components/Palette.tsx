import { ALL_YARN_COLORS } from '../constants/colors'
import { GrannySquare } from './GrannySquare'

export function Palette() {
  return (
    <>
      <div
        className="flex flex-row gap-5"
        style={{ maxWidth: '80%', justifyContent: 'space-between' }}
      >
        {Object.entries(ALL_YARN_COLORS)
          .slice(1)
          .map(([_name, color], i) => (
            <GrannySquare key={`palette-${i}`} colors={[color]} />
          ))}
      </div>
    </>
  )
}

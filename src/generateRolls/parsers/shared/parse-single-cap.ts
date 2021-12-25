import { CapOptions, NumberString } from 'types'

export function parseSingleCap({ above, below }: CapOptions, value?: NumberString) {
  return (roll: NumberString) => {
    if (above && Number(roll) > Number(above)) {
      return Number(value || above)
    }
    if (below && Number(roll) < Number(below)) {
      return Number(value || below)
    }
    return Number(roll)
  }
}

import { CapOptions, NumberString } from 'types'

export function parseSingleCap({ above, below }: CapOptions, value?: NumberString) {
  return (roll: NumberString) => {
    if (above && roll > above) {
      return Number(value || above)
    }
    if (below && roll < below) {
      return Number(value || below)
    }
    return Number(roll)
  }
}

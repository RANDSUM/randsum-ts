import { CapOptions } from 'types'

export function parseSingleCap({ above, below }: CapOptions, value?: number) {
  return (roll: number) => {
    if (above && roll > above) {
      return Number(value || above)
    }
    if (below && roll < below) {
      return Number(value || below)
    }
    return Number(roll)
  }
}

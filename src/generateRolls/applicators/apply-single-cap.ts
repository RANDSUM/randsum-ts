import { CapOptions } from 'types'

export function applySingleCap({ above, below }: CapOptions<number>, value?: number) {
  return (roll: number) => {
    if (above && roll > above) {
      return value || above
    }
    if (below && roll < below) {
      return value || below
    }
    return roll
  }
}

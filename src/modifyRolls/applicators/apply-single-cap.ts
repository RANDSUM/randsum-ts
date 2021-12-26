import { CapOptions } from '../../types'

export function applySingleCap({ above, below }: CapOptions<number>, value?: number) {
  return (roll: number) => {
    if (above !== undefined && roll > above) {
      return value ?? above
    }
    if (below !== undefined && roll < below) {
      return value ?? below
    }
    return roll
  }
}

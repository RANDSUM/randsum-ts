import { CapOptions, NumberString } from 'types'

export function applySingleCap({ above, below }: CapOptions<'strict'>, value?: NumberString<'strict'>) {
  return (roll: NumberString<'strict'>) => {
    if (above && roll > above) {
      return value || above
    }
    if (below && roll < below) {
      return value || below
    }
    return roll
  }
}

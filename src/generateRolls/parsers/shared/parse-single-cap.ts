import { CapOptions, NumberString } from 'types'

export function parseSingleCap({ above, below }: CapOptions<'parameters'>, value?: NumberString<'parameters'>) {
  return (roll: NumberString<'parameters'>) => {
    if (above && roll > above) {
      return value || above
    }
    if (below && roll < below) {
      return value || below
    }
    return roll
  }
}

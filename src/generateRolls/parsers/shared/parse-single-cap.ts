import { CapOptions } from 'types'

export function parseSingleCap({ above, below }: CapOptions, value?: number) {
  return (number_: number) => {
    if (above && number_ > above) {
      return value || above
    }
    if (below && number_ < below) {
      return value || below
    }
    return number_
  }
}

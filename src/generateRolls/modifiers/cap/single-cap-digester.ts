import { CapOptions } from 'types'

export const singleCapDigester =
  ({ above, below }: CapOptions, newValue?: number) =>
  (number_: number) => {
    if (above && number_ > above) {
      return newValue || above
    }
    if (below && number_ < below) {
      return newValue || below
    }
    return number_
  }

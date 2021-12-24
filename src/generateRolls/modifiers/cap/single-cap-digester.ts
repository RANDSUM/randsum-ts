import { CapOptions } from 'types'

export const singleCapDigester =
  ({ above, below }: CapOptions, value?: number) =>
  (number_: number) => {
    if (above && number_ > above) {
      return value || above
    }
    if (below && number_ < below) {
      return value || below
    }
    return number_
  }

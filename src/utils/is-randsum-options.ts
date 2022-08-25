import { Detailed, RandsumOptions } from 'types'

export function isRandsumOptions(
  argument: unknown
): argument is RandsumOptions<Detailed> {
  return (
    typeof argument === 'object' &&
    typeof (argument as RandsumOptions<Detailed>).sides !== undefined
  )
}

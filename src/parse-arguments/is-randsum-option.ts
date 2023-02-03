import { DieType, RandsumOptions } from '../types'

export default function isRandsumOptions(
  argument: unknown
): argument is RandsumOptions<DieType> {
  return (
    typeof argument === 'object' &&
    (argument as RandsumOptions<DieType>).sides !== undefined
  )
}

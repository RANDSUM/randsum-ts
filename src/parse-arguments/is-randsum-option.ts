import { DieType, RandsumOptions } from '../types'

const isRandsumOptions = (
  argument: unknown
): argument is RandsumOptions<DieType> =>
  typeof argument === 'object' &&
  (argument as RandsumOptions<DieType>).sides !== undefined

export default isRandsumOptions

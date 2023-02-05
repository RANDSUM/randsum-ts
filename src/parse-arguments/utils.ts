import { DiceNotation, DieType, RandsumOptions } from '../types'
import { coreNotationPattern } from './regexp'

export const isRandsumOptions = (
  argument: unknown
): argument is RandsumOptions<DieType> =>
  typeof argument === 'object' &&
  (argument as RandsumOptions<DieType>).sides !== undefined

export const isDiceNotation = (argument: unknown): argument is DiceNotation =>
  !!coreNotationPattern.test(String(argument))

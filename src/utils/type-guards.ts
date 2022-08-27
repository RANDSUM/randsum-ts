import { DiceNotation, RandsumOptions, DetailedType, DieType } from 'types'
import { coreNotationPattern } from './matchers'

export function isDiceNotation(argument: unknown): argument is DiceNotation {
  return !!coreNotationPattern.test(String(argument))
}

export function isRandsumOptions(
  argument: unknown
): argument is RandsumOptions<DieType, DetailedType> {
  return (
    typeof argument === 'object' &&
    typeof (argument as RandsumOptions<DieType, DetailedType>).sides !==
      undefined
  )
}

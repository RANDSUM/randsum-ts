import { DiceNotation, RandsumOptions, Detailed } from 'types'
import { coreNotationPattern } from './matchers'

export function isDiceNotation(argument: unknown): argument is DiceNotation {
  return !!coreNotationPattern.test(String(argument))
}

export function isRandsumOptions(
  argument: unknown
): argument is RandsumOptions<Detailed> {
  return (
    typeof argument === 'object' &&
    typeof (argument as RandsumOptions<Detailed>).sides !== undefined
  )
}

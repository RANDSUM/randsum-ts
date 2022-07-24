import { DiceNotation, NumberString, RandsumOptions } from '../../types'

export function isRandsumOptions(argument: NumberString | RandsumOptions | DiceNotation): argument is RandsumOptions {
  return typeof argument === 'object'
}

import { DiceNotation, NumberString, RandsumOptions, UserOptions } from 'types'

export function isOptions(
  argument: NumberString | RandsumOptions | DiceNotation,
): argument is RandsumOptions & UserOptions {
  return typeof argument === 'object'
}

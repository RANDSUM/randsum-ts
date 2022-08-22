import { DiceNotation, NumberString, RandsumOptions } from 'types'

export function isRandsumOptions<D extends boolean>(
  argument: NumberString | RandsumOptions<D> | DiceNotation,
): argument is RandsumOptions<D> {
  return typeof argument === 'object'
}

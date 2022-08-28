import { RandsumOptions, SecondaryRandsumOptions, UserOptions } from './options'
import { DieType, DetailedType, DiceNotation, NumberString } from './primitives'

export type RandsumArguments<
  N extends DieType = DieType,
  D extends DetailedType = DetailedType
> = {
  primeArgument: RandsumOptions<N, D> | DiceNotation<N> | NumberString
  secondArgument?: SecondaryRandsumOptions<N, D> | UserOptions<D>
}

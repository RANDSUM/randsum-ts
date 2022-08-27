import { RandsumOptions, SecondaryRandsumOptions, UserOptions } from './options'
import { DieType, DetailedType, DiceNotation, NumberString } from './primitives'

export type RandsumArguments<
  N extends DieType = DieType,
  D extends DetailedType = DetailedType
> = {
  primeArgument: RandsumOptions<N, D> | DiceNotation<N> | NumberString
  secondArgument?: SecondaryRandsumOptions<N, D> | UserOptions<D>
}

export type AllArgumentTypes<
  N extends DieType = DieType,
  D extends DetailedType = DetailedType
> =
  | RandsumArguments<N, D>['primeArgument']
  | RandsumArguments<N, D>['secondArgument']

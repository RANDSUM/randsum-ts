import { RandsumOptions, SecondaryRandsumOptions, UserOptions } from './options'
import { DieType, DetailedType, DiceNotation, NumberString } from './primitives'

export type RandsumArguments = {
  primeArgument:
    | RandsumOptions<DieType, DetailedType>
    | DiceNotation<DieType>
    | NumberString
  secondArgument?:
    | SecondaryRandsumOptions<DieType, DetailedType>
    | UserOptions<DetailedType>
}

export type AllArgumentTypes =
  | RandsumArguments['primeArgument']
  | RandsumArguments['secondArgument']

import {
  RandsumOptions,
  RandsumOptionsWithoutSides,
  UserOptions
} from './options'
import { DiceNotation, NumberString } from './primitives'

export type PrimeArgument<D extends boolean> =
  | RandsumOptions<D>
  | DiceNotation
  | NumberString
export type SecondArgument<D extends boolean> =
  | RandsumOptionsWithoutSides<D>
  | UserOptions<D>

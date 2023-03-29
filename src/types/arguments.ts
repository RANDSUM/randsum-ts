import { CustomSidesOption, RollOptions } from './options'
import { DiceNotation, NumberString } from './primitives'

export type CustomSidesArguments =
  | DiceNotation<string>
  | RollOptions<string>
  | CustomSidesOption

export type StandardSidesArguments =
  | NumberString
  | RollOptions<number>
  | DiceNotation<number>
  | undefined

export type RollArguments = StandardSidesArguments | CustomSidesArguments

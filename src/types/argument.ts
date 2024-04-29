import { CustomSides, DicePoolOptions } from './options'
import { DiceNotation } from './primitives'

export type RollArgument =
  | undefined
  | number
  | DicePoolOptions<number | string>
  | DiceNotation<number | string>
  | CustomSides

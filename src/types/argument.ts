import { DiceNotation } from '..'
import { CustomSides, DicePoolOptions } from './options'

export type RollArgument =
  | undefined
  | number
  | DicePoolOptions<number | string>
  | DiceNotation<number | string>
  | CustomSides

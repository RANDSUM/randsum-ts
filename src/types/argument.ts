import { CustomSides, DicePoolOptions } from './options'
import { DiceNotation } from './primitives'

export type CoreRollArgument =
  | string
  | number
  | DicePoolOptions<string>
  | DicePoolOptions<number>
  | DiceNotation<number>
  | DiceNotation<string>
  | CustomSides

export type RollArgument = CoreRollArgument | CoreRollArgument[] | undefined

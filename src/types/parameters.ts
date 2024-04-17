import { SingleDie } from '../Die'
import { generateInitialRolls } from '../roll/utils'
import { CustomSides, Modifiers, RollOptions } from './options'
import { DiceNotation } from './primitives'

export interface DiceParameters<D extends string | number = number> {
  quantity: number
  sides: D extends number ? number : string[]
}

export interface RollParameters<D extends string | number = number> {
  argument:
    | number
    | RollOptions<number>
    | DiceNotation<number>
    | undefined
    | DiceNotation<string>
    | RollOptions<string>
    | CustomSides
  diceOptions: DiceParameters<D>[]
  generateInitialRolls: typeof generateInitialRolls<D>
  modifiers: Modifiers
  dice: SingleDie<D>[]
}

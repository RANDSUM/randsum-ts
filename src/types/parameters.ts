import { SingleDie } from '../Die'
import { generateInitialRolls } from '../roll/utils'
import { CustomSides, Modifier, RollOptions } from './options'
import { DiceNotation, NumberString } from './primitives'

export interface DiceParameters<D extends string | number = number> {
  quantity: number
  sides: D extends number ? number : string[]
}

export interface RollParameters<D extends string | number = number> {
  argument:
    | NumberString
    | RollOptions<number>
    | DiceNotation<number>
    | undefined
    | DiceNotation<string>
    | RollOptions<string>
    | CustomSides
  diceOptions: DiceParameters<D>[]
  generateInitialRolls: typeof generateInitialRolls<D>
  modifiers: Array<Modifier<number>>
  dice: SingleDie<D>[]
}

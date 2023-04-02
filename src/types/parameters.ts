import { SingleDie } from '../Die'
import { CustomSides, Modifier, RollOptions } from './options'
import { DiceNotation, NumberString } from './primitives'

export interface DiceParameters<D extends string | number> {
  quantity: number
  sides: D extends number ? number : string[]
}

export interface RollParameters<D extends string | number> {
  argument:
    | NumberString
    | RollOptions<number>
    | DiceNotation<number>
    | undefined
    | DiceNotation<string>
    | RollOptions<string>
    | CustomSides
  diceOptions: DiceParameters<D>[]
  modifiers: Array<Modifier<number>>
  dice: SingleDie<D>[]
}

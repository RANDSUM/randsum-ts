import { SingleDie } from '../Die'
import { CustomSidesOption, Modifier, RollOptions } from './options'
import { DiceNotation, DieSides, NumberString } from './primitives'

export interface DiceParameters<D extends DieSides> {
  quantity: number
  sides: D extends number ? number : string[]
}

export interface RollParameters<D extends DieSides> {
  argument:
    | RollOptions<D>
    | DiceNotation<D>
    | NumberString
    | CustomSidesOption
    | undefined
  diceOptions: DiceParameters<D>[]
  modifiers: Array<Modifier<number>>
  dice: SingleDie<D>[]
}

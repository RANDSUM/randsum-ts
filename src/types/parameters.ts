import { SingleDie } from '../Die'
import { RollArguments } from './arguments'
import { Modifier } from './options'
import { DieSides } from './primitives'

export interface DiceParameters<D extends DieSides> {
  quantity: number
  sides: D extends number ? number : string[]
}

export interface RollParameters<D extends DieSides> {
  argument: RollArguments
  diceOptions: DiceParameters<D>[]
  modifiers: Array<Modifier<number>>
  dice: SingleDie<D>[]
}

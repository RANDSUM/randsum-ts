import { CustomSidesDie, StandardDie } from '../Die'
import { DiceOptions, Modifier, RollOptions } from './options'
import { DiceNotation, DieSides, NumberString } from './primitives'

export type RollParameters<T extends DieSides = number> = {
  argument:
    | RollOptions<number>
    | DiceNotation
    | NumberString
    | undefined
    | RollOptions<string>
    | DiceNotation<string>
  diceOptions: DiceOptions<T>[]
  initialRolls: T[]
  modifiers: Array<Modifier<number>>
  dice: (T extends number ? StandardDie : CustomSidesDie)[]

  quantity: number
  sides: number
}

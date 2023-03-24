import { CustomSidesDicePool, StandardDicePool } from '../Die'
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
  dice: DiceOptions<T>[]
  initialRolls: T[]
  modifiers: Array<Modifier<number>>
  quantity: number
  sides: number
  pool: T extends number ? StandardDicePool : CustomSidesDicePool
} & (T extends number ? Record<never, never> : { faces: string[] })

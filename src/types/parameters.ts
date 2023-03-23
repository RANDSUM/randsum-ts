import { CustomSidesDicePool, StandardDicePool } from '../Die'
import { Modifier, RollOptions } from './options'
import { CustomSides, DiceNotation, DieType, NumberString } from './primitives'

export type RollParameters<T extends DieType = 'standard'> = {
  argument:
    | RollOptions
    | DiceNotation
    | NumberString
    | undefined
    | RollOptions<'customSides'>
    | DiceNotation<'customSides'>
  initialRolls: T extends 'standard' ? number[] : CustomSides
  modifiers: Array<Modifier<number>>
  quantity: number
  sides: number
  pool: T extends 'standard' ? StandardDicePool : CustomSidesDicePool
} & (T extends 'standard' ? Record<never, never> : { faces: CustomSides })

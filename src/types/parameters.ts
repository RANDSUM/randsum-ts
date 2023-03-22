import { Modifier } from './options'
import { CustomSides, DieType } from './primitives'

export type RollParameters<T extends DieType = DieType> = {
  initialRolls: number[]
  modifiers: Array<Modifier<number>>
  quantity: number
  sides: number
} & (T extends 'standard' ? Record<never, never> : { faces: CustomSides })

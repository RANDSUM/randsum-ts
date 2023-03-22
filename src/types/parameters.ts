import { Modifier } from '../roll/parse-arguments/types'
import { CustomSides, DieType } from './primitives'

type CoreRollParameters = {
  initialRolls: number[]
  modifiers: Array<Modifier<number>>
  quantity: number
  sides: number
}
type NewRollParameters<T extends DieType = DieType> = T extends 'standard'
  ? CoreRollParameters
  : CoreRollParameters & { faces: CustomSides }

export type RollParameters<N extends DieType = DieType> = NewRollParameters<N>

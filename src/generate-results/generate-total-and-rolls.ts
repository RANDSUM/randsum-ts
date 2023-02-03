import {
  CustomSidesDie,
  InternalRollParameters,
  RollResult,
  StandardDie
} from '../types'
import { RollBonuses } from './types'

export default function generateTotalAndRolls({
  faces,
  rolls,
  simpleMathModifier
}: Pick<InternalRollParameters, 'faces'> & RollBonuses):
  | Pick<RollResult<StandardDie>, 'total' | 'rolls'>
  | Pick<RollResult<CustomSidesDie>, 'total' | 'rolls'> {
  if (faces === undefined) {
    return {
      total:
        Number([...rolls].reduce((total, roll) => total + roll, 0)) +
        simpleMathModifier,
      rolls
    }
  }

  const newRolls = rolls.map((roll) => faces[roll - 1])
  return { total: newRolls.join(', '), rolls: newRolls }
}

import { DieType, InternalRollParameters, RollResult } from 'types'

export function generateTotalAndResult({
  faces,
  rolls,
  simpleMathModifier
}: Pick<InternalRollParameters, 'faces'> & {
  rolls: number[]
  simpleMathModifier: number
}): Pick<RollResult<DieType>, 'total' | 'rolls'> {
  if (faces == undefined) {
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

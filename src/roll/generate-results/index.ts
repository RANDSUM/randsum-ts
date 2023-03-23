import { RollParameters, RollResult } from '../../types'
import { isCustomSidesRollParameters } from '../parse-arguments/utils'
import applyModifiers from './apply-modifiers'
import { coreRandomFactory, makeRolls } from './utils'

function generateResult(incompleteRollParameters: RollParameters): RollResult {
  const rollOne = coreRandomFactory(incompleteRollParameters.sides)
  const initialRolls = makeRolls(incompleteRollParameters.quantity, rollOne)

  const rollParameters = { ...incompleteRollParameters, initialRolls }
  const { rolls, simpleMathModifier } = applyModifiers(rollParameters, rollOne)

  if (isCustomSidesRollParameters(incompleteRollParameters)) {
    const customRolls = rolls.map(
      (roll) => incompleteRollParameters.faces[roll - 1]
    )
    return {
      rollParameters,
      total: customRolls.join(', '),
      rolls: customRolls
    }
  }

  return {
    rollParameters,
    total:
      Number([...rolls].reduce((total, roll) => total + roll, 0)) +
      simpleMathModifier,
    rolls
  }
}

export default generateResult

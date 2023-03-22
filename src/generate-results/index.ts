import { isCustomSidesRollParameters } from '../parse-arguments/utils'
import { RollParameters, RollResult } from '../types'
import applyModifiers from './apply-modifiers'
import { coreRandomFactory, makeRolls } from './utils'

function generateResult(
  rollParameters: RollParameters
):
  | Omit<RollResult<'customSides'>, 'arguments'>
  | Omit<RollResult<'standard'>, 'arguments'> {
  const rollOne = coreRandomFactory(rollParameters.sides)

  const initialRolls = makeRolls(rollParameters.quantity, rollOne)

  const newRollParameters = { ...rollParameters, initialRolls }

  const { rolls, simpleMathModifier } = applyModifiers(
    newRollParameters,
    rollOne
  )

  if (!isCustomSidesRollParameters(rollParameters)) {
    return {
      rollParameters: newRollParameters,
      total:
        Number([...rolls].reduce((total, roll) => total + roll, 0)) +
        simpleMathModifier,
      rolls
    }
  }

  const customRolls = rolls.map((roll) => rollParameters.faces[roll - 1])
  return {
    rollParameters: newRollParameters,
    total: customRolls.join(', '),
    rolls: customRolls
  }
}

export default generateResult

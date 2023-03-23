import { RollParameters } from '../../types/parameters'
import { RollResult } from '../../types/results'
import { isCustomSidesRollParameters } from '../parse-arguments/utils'
import applyModifiers from './apply-modifiers'

function generateResult(
  rollParameters: RollParameters | RollParameters<'customSides'>
): RollResult | RollResult<'customSides'> {
  if (isCustomSidesRollParameters(rollParameters)) {
    return {
      rollParameters,
      total: rollParameters.initialRolls.join(', '),
      rolls: rollParameters.initialRolls
    }
  }

  const { rolls, simpleMathModifier } = applyModifiers(rollParameters)

  return {
    rollParameters,
    total:
      Number([...rolls].reduce((total, roll) => total + roll, 0)) +
      simpleMathModifier,
    rolls
  }
}

export default generateResult

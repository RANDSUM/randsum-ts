import { isCustomSidesRollParameters } from '../../types/guards'
import { RollParameters } from '../../types/parameters'
import { RollResult } from '../../types/results'
import applyModifiers from './apply-modifiers'

function generateResult(
  rollParameters: RollParameters | RollParameters<string>
): RollResult | RollResult<string> {
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

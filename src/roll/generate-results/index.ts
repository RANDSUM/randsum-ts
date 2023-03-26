import { RollParameters } from '../../types/parameters'
import { RollResult } from '../../types/results'
import applyModifiers from './apply-modifiers'

const isCustomSidesRollParameters = (
  argument: RollParameters<number> | RollParameters<string>
): argument is RollParameters<string> =>
  (argument as RollParameters<string>).diceOptions.every(({ sides }) =>
    Array.isArray(sides)
  )

function generateResult(
  rollParameters: RollParameters<number> | RollParameters<string>
): RollResult<number> | RollResult<string> {
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

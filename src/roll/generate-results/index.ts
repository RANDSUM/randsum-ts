import { RollParameters } from '../../types/parameters'
import { DieSides } from '../../types/primitives'
import { RollResult } from '../../types/results'
import applyModifiers from './apply-modifiers'

const isCustomSidesRollParameters = (
  argument: RollParameters | RollParameters<string>
): argument is RollParameters<string> =>
  (argument as RollParameters<string>).diceOptions.every(({ sides }) =>
    Array.isArray(sides)
  )

function generateResult(rollParameters: RollParameters): RollResult
function generateResult(
  rollParameters: RollParameters<string>
): RollResult<string>
function generateResult<T extends DieSides>(
  rollParameters: T extends number ? RollParameters : RollParameters<string>
): T extends number ? RollResult : RollResult<string>
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

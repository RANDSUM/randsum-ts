import { RollParameters } from '../../types/parameters'
import { RollResult } from '../../types/results'
import { generateInitialRolls } from '../parse-arguments/utils'
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
    const initialRolls = generateInitialRolls(rollParameters.dice)
    return {
      rollParameters,
      initialRolls,
      total: initialRolls.join(', '),
      rolls: initialRolls
    }
  }

  return {
    rollParameters,
    ...applyModifiers(rollParameters)
  }
}

export default generateResult

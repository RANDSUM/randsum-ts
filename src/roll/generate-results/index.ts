import { RollParameters } from '../../types/parameters'
import { RollResult } from '../../types/results'
import generateCustomResults from './generate-custom-results'
import applyModifiers from './generate-standard-results'

const isCustomSidesRollParameters = (
  argument: RollParameters<number> | RollParameters<string>
): argument is RollParameters<string> =>
  (argument as RollParameters<string>).diceOptions.every(({ sides }) =>
    Array.isArray(sides)
  )

function generateResult(
  rollParameters: RollParameters<number> | RollParameters<string>
): RollResult<number> | RollResult<string> {
  return isCustomSidesRollParameters(rollParameters)
    ? generateCustomResults(rollParameters)
    : applyModifiers(rollParameters)
}

export default generateResult

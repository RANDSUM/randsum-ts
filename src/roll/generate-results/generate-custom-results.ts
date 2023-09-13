import { RollParameters } from '../../types/parameters'
import { RollResult } from '../../types/results'

const generateCustomResults = (
  rollParameters: RollParameters<string>
): RollResult<string> => {
  const initialRolls = rollParameters.generateInitialRolls(rollParameters.dice)
  return {
    rollParameters,
    initialRolls,
    total: initialRolls.join(', '),
    rolls: initialRolls
  }
}

export default generateCustomResults

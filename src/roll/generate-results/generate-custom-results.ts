import { RollParameters } from '../../types/parameters'
import { RollResult } from '../../types/results'
import { generateInitialRolls } from '../parse-arguments/utils'

const generateCustomResults = (
  rollParameters: RollParameters<string>
): RollResult<string> => {
  const initialRolls = generateInitialRolls(rollParameters.dice)
  return {
    rollParameters,
    initialRolls,
    total: initialRolls.join(', '),
    rolls: initialRolls
  }
}

export default generateCustomResults

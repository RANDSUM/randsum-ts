import generateResult from './generate-results'
import parseArguments from './parse-arguments'
import {
  CustomSidesDie,
  DiceNotation,
  NumberString,
  RandsumOptions,
  RollResult,
  StandardDie
} from './types'

function randsum(
  firstArg?:
    | NumberString
    | RandsumOptions<StandardDie>
    | DiceNotation<StandardDie>
): RollResult<StandardDie>
function randsum(
  firstArg: RandsumOptions<CustomSidesDie> | DiceNotation<CustomSidesDie>
): RollResult<CustomSidesDie>

function randsum(
  primeArgument?: RandsumOptions | DiceNotation | NumberString
): RollResult {
  const rollParameters = parseArguments(primeArgument)
  const rollResult = generateResult(rollParameters)
  return {
    ...rollResult,
    arguments: [primeArgument]
  }
}

export default randsum

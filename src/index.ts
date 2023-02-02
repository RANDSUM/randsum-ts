import generateResult from './generate-result'
import parseArguments from './parse-arguments'
import {
  CustomSidesDie,
  DiceNotation,
  NumberString,
  RandsumOptions,
  RollResult,
  StandardDie
} from './types'

function randsum(): RollResult<StandardDie>
function randsum(sides: NumberString): RollResult<StandardDie>
function randsum(notation: DiceNotation<StandardDie>): RollResult<StandardDie>
function randsum(
  notation: DiceNotation<CustomSidesDie>
): RollResult<CustomSidesDie>
function randsum(
  rollOptions: RandsumOptions<StandardDie>
): RollResult<StandardDie>
function randsum(
  rollOptions: RandsumOptions<CustomSidesDie>
): RollResult<CustomSidesDie>
function randsum(
  primeArgument?: RandsumOptions | DiceNotation | NumberString
): RollResult<CustomSidesDie> | RollResult<StandardDie> {
  const internalRollParameters = parseArguments(primeArgument)
  const rollResult = generateResult(internalRollParameters)
  return {
    ...rollResult,
    arguments: [primeArgument]
  }
}

export default randsum

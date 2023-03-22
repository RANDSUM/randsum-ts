import {
  DiceNotation,
  NumberString,
  RollOptions,
  RollParameters
} from '../types'
import parseNotation from './parse-notation'
import parseOptions from './parse-options'
import { isDiceNotation, isRollOptions } from './utils'

function parseArguments(
  primeArgument: RollOptions | DiceNotation | NumberString | undefined
): RollParameters {
  if (isRollOptions(primeArgument)) {
    return parseOptions(primeArgument)
  }

  if (isDiceNotation(primeArgument)) {
    return parseNotation(primeArgument)
  }

  return {
    sides: primeArgument === undefined ? 20 : Number(primeArgument),
    modifiers: [],
    initialRolls: [],
    quantity: 1
  }
}
export default parseArguments

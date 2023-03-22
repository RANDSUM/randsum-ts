import {
  DiceNotation,
  DieType,
  NumberString,
  RollOptions,
  RollParameters
} from '../types'
import parseNotation from './parse-notation'
import parseOptions from './parse-options'
import { isDiceNotation, isRollOptions } from './utils'

function parseArguments<T extends DieType>(
  primeArgument: RollOptions<T> | DiceNotation<T> | NumberString | undefined
): RollParameters<T> {
  if (isRollOptions(primeArgument)) {
    return parseOptions(primeArgument)
  }

  if (isDiceNotation(primeArgument)) {
    return parseNotation(primeArgument)
  }

  const standard: RollParameters<'standard'> = {
    sides: primeArgument === undefined ? 20 : Number(primeArgument),
    modifiers: [],
    initialRolls: [],
    quantity: 1
  }

  return standard as RollParameters<T>
}
export default parseArguments

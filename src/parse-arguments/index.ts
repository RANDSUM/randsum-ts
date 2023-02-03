import {
  DiceNotation,
  InternalRollParameters,
  NumberString,
  RandsumOptions
} from '../types'
import isDiceNotation from './is-dice-notation'
import isRandsumOptions from './is-randsum-option'
import parseNotation from './parse-notation'
import parseOptions from './parse-options'

export default function parseArguments(
  primeArgument: RandsumOptions | DiceNotation | NumberString | undefined
): InternalRollParameters {
  if (isRandsumOptions(primeArgument)) {
    return parseOptions(primeArgument)
  }

  if (isDiceNotation(primeArgument)) {
    return parseNotation(primeArgument)
  }

  return {
    sides: primeArgument === undefined ? 20 : Number(primeArgument),
    modifiers: [],
    quantity: 1
  }
}

import { parseNotation } from 'parseArguments/parseNotation'
import { DiceNotation, Options, RandsumPrimeArgument, RollParameters } from 'types'
import { diceNotationPattern } from 'utils'

import { convertOptionsToParameters } from './convertOptionsToParameters'

function isRollOptions(argument: RandsumPrimeArgument): argument is Options {
  return typeof argument === 'object'
}

function isDiceNotation(argument: unknown): argument is DiceNotation {
  return !!diceNotationPattern.test(String(argument))
}

export function parseArguments(primeArgument: RandsumPrimeArgument): RollParameters {
  if (isDiceNotation(primeArgument)) {
    return parseNotation(primeArgument)
  }

  return {
    rolls: 1,
    ...(isRollOptions(primeArgument) ? convertOptionsToParameters(primeArgument) : { sides: Number(primeArgument) }),
  }
}

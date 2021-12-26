import { parseNotation } from 'parseArguments/parseNotation'
import { DiceNotation, PrimeArgument, RandsumOptionsWithoutSides, RollOptions, RollParameters } from 'types'
import { diceNotationPattern } from 'utils'

import { convertOptionsToParameters } from './convertOptionsToParameters'

function isRollOptions(argument: PrimeArgument): argument is RollOptions {
  return typeof argument === 'object'
}

function isDiceNotation(argument: unknown): argument is DiceNotation {
  return !!diceNotationPattern.test(String(argument))
}

export function parseArguments(
  primeArgument: PrimeArgument,
  secondArgument: RandsumOptionsWithoutSides = {},
): RollParameters {
  const secondaryParameters = convertOptionsToParameters(secondArgument)

  if (isDiceNotation(primeArgument)) {
    return { ...secondaryParameters, ...parseNotation(primeArgument) }
  }

  const primeParameters = isRollOptions(primeArgument)
    ? convertOptionsToParameters(primeArgument)
    : { sides: Number(primeArgument) }

  return { sides: 0, rolls: 1, ...primeParameters, ...secondaryParameters }
}

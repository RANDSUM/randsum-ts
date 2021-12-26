import { parseNotation } from 'parseArguments/parseNotation'
import { DiceNotation, NumberString, RandsumOptions, RollParameters, UserOptions } from 'types'
import { isDiceNotation, isOptions } from 'utils'

import { convertOptionsToParameters } from './convertOptionsToParameters'

export function parseArguments(
  primeArgument: NumberString | RandsumOptions | DiceNotation,
  secondArgument: Omit<RandsumOptions, 'sides'> = {},
): RollParameters & UserOptions {
  const secondaryParameters = convertOptionsToParameters(secondArgument)

  if (isDiceNotation(primeArgument)) {
    return { ...secondaryParameters, ...parseNotation(primeArgument) }
  }

  if (isOptions(primeArgument)) {
    return { sides: 0, quantity: 1, ...secondaryParameters, ...convertOptionsToParameters(primeArgument) }
  }

  const sides = Number(primeArgument)

  if (Number.isNaN(Number(sides))) {
    throw new TypeError(`Bad Argument: ${String(primeArgument)}`)
  }

  return { sides, quantity: 1, ...secondaryParameters }
}

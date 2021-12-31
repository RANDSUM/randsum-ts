import { DiceNotation, NewRollParameters, NumberString, RandsumOptions, UserOptions } from '../types'
import { convertOptionsToParameters } from './convertOptionsToParameters'
import { parseNotation } from './parseNotation'
import { isDiceNotation, isOptions } from './utils'

export function parseArguments(
  primeArgument: DiceNotation,
  secondArgument?: UserOptions,
): NewRollParameters & UserOptions
export function parseArguments(
  primeArgument: RandsumOptions,
  secondArgument?: UserOptions,
): NewRollParameters & UserOptions
export function parseArguments(
  primeArgument: NumberString,
  secondArgument?: Omit<RandsumOptions, 'sides'>,
): NewRollParameters & UserOptions
export function parseArguments(
  primeArgument: NumberString | RandsumOptions | DiceNotation,
  secondArgument: Omit<RandsumOptions, 'sides'> = {},
): NewRollParameters & UserOptions {
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

  return { quantity: 1, ...secondaryParameters, sides }
}

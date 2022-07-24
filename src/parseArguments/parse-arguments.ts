import {
  DiceNotation,
  NumberString,
  RandsumOptions,
  RandsumOptionsWithoutSides,
  RollParameters,
  UserOptions,
} from '../types'
import { convertOptionsToParameters } from './convertOptionsToParameters'
import { parseNotation } from './parseNotation'
import { isDiceNotation, isRandsumOptions, makeRolls, rollOneFactory } from './utils'

export function parseArguments(
  primeArgument: RandsumOptions | DiceNotation | NumberString,
  secondArgument: RandsumOptionsWithoutSides | UserOptions = {},
): RollParameters {
  if (isRandsumOptions(primeArgument)) {
    const { detailed, randomizer, ...rollParameters } = convertOptionsToParameters(primeArgument)
    const rollOne = rollOneFactory(rollParameters.sides, randomizer)
    const initialRolls = makeRolls(rollParameters.quantity, rollOne)

    return { rollOne, initialRolls, ...rollParameters, detailed }
  }

  const { detailed, randomizer, quantity, ...restRollParameters } = convertOptionsToParameters(secondArgument)

  if (isDiceNotation(primeArgument)) {
    const rollParameters = { ...restRollParameters, ...parseNotation(primeArgument) }
    const rollOne = rollOneFactory(rollParameters.sides, randomizer)
    const initialRolls = makeRolls(rollParameters.quantity, rollOne)
    return { rollOne, initialRolls, ...rollParameters, detailed }
  }

  const sides = Number(primeArgument)

  const rollOne = rollOneFactory(sides, randomizer)
  const initialRolls = makeRolls(quantity, rollOne)

  return { rollOne, initialRolls, detailed, quantity, ...restRollParameters, sides }
}

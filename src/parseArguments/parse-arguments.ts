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

export function parseArguments<D extends boolean>(
  primeArgument: RandsumOptions<D> | DiceNotation | NumberString,
  secondArgument: RandsumOptionsWithoutSides<D> | UserOptions<D> = {},
): { detailed: D } & RollParameters {
  if (isRandsumOptions<D>(primeArgument)) {
    const [detailed, { randomizer, ...rollParameters }] = convertOptionsToParameters<D>(primeArgument)
    const rollOne = rollOneFactory(rollParameters.sides, randomizer)
    const initialRolls = makeRolls(rollParameters.quantity, rollOne)

    return { detailed, rollOne, initialRolls, ...rollParameters }
  }

  const [detailed, { randomizer, quantity, ...restRollParameters }] = convertOptionsToParameters<D>(secondArgument)

  if (isDiceNotation(primeArgument)) {
    const rollParameters = { ...restRollParameters, ...parseNotation(primeArgument) }
    const rollOne = rollOneFactory(rollParameters.sides, randomizer)
    const initialRolls = makeRolls(rollParameters.quantity, rollOne)
    return { detailed, rollOne, initialRolls, ...rollParameters }
  }

  const sides = Number(primeArgument)

  const rollOne = rollOneFactory(sides, randomizer)
  const initialRolls = makeRolls(quantity, rollOne)

  return { detailed, rollOne, initialRolls, quantity, ...restRollParameters, sides }
}

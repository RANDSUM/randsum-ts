import { DiceNotation, NumberString, RandsumOptions, RandsumOptionsWithoutSides } from '../types'
import { convertOptionsToParameters } from './convertOptionsToParameters'
import { parseNotation } from './parseNotation'
import { isDiceNotation, isOptions, makeRolls, rollOneFactory } from './utils'

export function parseArguments(
  primeArgument: NumberString | RandsumOptions | DiceNotation,
  secondArgument: RandsumOptionsWithoutSides = {},
) {
  if (isOptions(primeArgument)) {
    const { detailed, randomizer, ...rollParameters } = convertOptionsToParameters(primeArgument)
    const rollOne = rollOneFactory(rollParameters.sides, randomizer)
    const initialRolls = makeRolls(rollParameters.quantity, rollOne)

    return { rollOne, initialRolls, ...rollParameters, detailed }
  }

  const { detailed, randomizer } = convertOptionsToParameters(secondArgument)

  if (isDiceNotation(primeArgument)) {
    const rollParameters = parseNotation(primeArgument)
    const rollOne = rollOneFactory(rollParameters.sides, randomizer)
    const initialRolls = makeRolls(rollParameters.quantity, rollOne)
    return { rollOne, initialRolls, ...rollParameters, detailed }
  }

  const sides = Number(primeArgument)

  const rollOne = rollOneFactory(sides, randomizer)
  const initialRolls = makeRolls(1, rollOne)

  return { quantity: 1, sides, rollOne, initialRolls, detailed }
}

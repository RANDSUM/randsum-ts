import { NumberString, RandsumOptionsWithoutSides, UserOptions } from 'types'
import { makeRolls, rollOneFactory } from 'utils'

import { convertOptionsToParameters } from '../convertOptionsToParameters'

export function parseNumber<D extends boolean> (
  number: NumberString,
  options: UserOptions<D> | RandsumOptionsWithoutSides<D>
) {
  const [detailed, { randomizer, quantity, ...restRollParameters }] = convertOptionsToParameters<D>(options)
  const sides = Number(number)
  const rollOne = rollOneFactory(sides, randomizer)
  const initialRolls = makeRolls(quantity, rollOne)

  return { detailed, rollOne, initialRolls, quantity, ...restRollParameters, sides }
}

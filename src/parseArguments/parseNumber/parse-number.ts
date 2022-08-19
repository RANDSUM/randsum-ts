import { NumberString, RandsumOptionsWithoutSides, UserOptions } from '../../types'
import { convertOptionsToParameters } from '../convertOptionsToParameters'
import { makeRolls, rollOneFactory } from '../utils'

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

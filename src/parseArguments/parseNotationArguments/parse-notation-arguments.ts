import { DiceNotation, RandsumOptionsWithoutSides, UserOptions } from 'types'
import { makeRolls, rollOneFactory } from 'utils'

import { convertOptionsToParameters } from '../convertOptionsToParameters'
import { parseNotation } from './parseNotation'

export function parseNotationArguments<D extends boolean> (
  notation: DiceNotation,
  options: UserOptions<D> | RandsumOptionsWithoutSides<D>
) {
  const [detailed, { randomizer, ...restRollParameters }] = convertOptionsToParameters<D>(options)
  const rollParameters = { ...restRollParameters, ...parseNotation(notation) }
  const rollOne = rollOneFactory(rollParameters.sides, randomizer)
  const initialRolls = makeRolls(rollParameters.quantity, rollOne)
  return { detailed, rollOne, initialRolls, ...rollParameters }
}

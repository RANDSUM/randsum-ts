import { RandsumOptions } from 'types'
import { makeRolls, rollOneFactory } from 'utils'

import { convertOptionsToParameters } from '../convertOptionsToParameters'

export function parseOptionArguments<D extends boolean> (options: RandsumOptions<D>) {
  const [detailed, { randomizer, ...rollParameters }] = convertOptionsToParameters<D>(options)
  const rollOne = rollOneFactory(rollParameters.sides, randomizer)
  const initialRolls = makeRolls(rollParameters.quantity, rollOne)

  return { detailed, rollOne, initialRolls, ...rollParameters }
}

import { Randomizer, RollParameters } from '../types'
import { makeRolls, rollOneFactory } from '../utils'

export function generateRolls(
  sides: number,
  quantity: number,
  randomizer: Randomizer
): Pick<RollParameters, 'rollOne' | 'initialRolls'> {
  const rollOne = rollOneFactory(sides, randomizer)
  const initialRolls = makeRolls(quantity, rollOne)
  return { rollOne, initialRolls }
}

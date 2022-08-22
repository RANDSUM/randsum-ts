import { Randomizer } from 'types'
import { makeRolls, rollOneFactory } from 'utils'

export function generateRolls (sides: number, quantity: number, randomizer?: Randomizer): [() => number, number[]] {
  const rollOne = rollOneFactory(sides, randomizer)
  const initialRolls = makeRolls(quantity, rollOne)
  return [rollOne, initialRolls]
}

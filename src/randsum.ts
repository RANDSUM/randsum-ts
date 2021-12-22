import { digestTotals } from 'digestTotals'
import { Randomizer, RandsumPrimeArg, RollResult } from 'types'
import { digestPrimeArgIntoParameters } from 'digestPrimeArgIntoParameters'
import { randomNumber } from 'utils'

// randsum(6) - return a random d6 roll
// randsum('2d6') - roll 2 d6, add the totals, and return the result
// randsum('3d20', true) - roll 3 d20, return a detailed result

export function randsum(primeArg: RandsumPrimeArg): number
export function randsum(primeArg: RandsumPrimeArg, customRandomizer: Randomizer): number
export function randsum<D extends boolean>(primeArg: RandsumPrimeArg, detailed: D): D extends true ? RollResult : number
export function randsum<D extends boolean>(
  primeArg: RandsumPrimeArg,
  detailed: D,
  customRandomizer?: Randomizer,
): D extends true ? RollResult : number
export function randsum(
  primeArg: RandsumPrimeArg,
  secondArg?: boolean | Randomizer,
  customRandomizer?: Randomizer,
): number | RollResult {
  const rollParams = digestPrimeArgIntoParameters(primeArg)

  const showDetailed = typeof secondArg === 'function' ? false : secondArg
  const randomizer = (typeof secondArg === 'function' ? secondArg : customRandomizer) || randomNumber

  const rollDie = () => randomizer(rollParams.sides)

  const rollTotals = Array.from(Array(rollParams.rolls)).map(rollDie)
  const total = digestTotals(rollTotals, rollParams, rollDie)

  return showDetailed ? { total, rollTotals, ...rollParams } : total
}

import { transformRollTotalsWithParameters } from 'transformRollTotalsWithParameters'
import { Randomizer, RandsumPrimeArg, RollModifier, RollResult, RollResultOrNum } from 'types'
import { digestPrimeArgIntoParameters } from 'digestPrimeArgIntoParameters'
import { randomNumber } from 'utils'

export function randsum(primeArg: RandsumPrimeArg): number
export function randsum(primeArg: RandsumPrimeArg, customRandomizer: Randomizer): number
export function randsum<D extends boolean>(primeArg: RandsumPrimeArg, detailed: D): RollResultOrNum<D>
export function randsum<D extends boolean>(
  primeArg: RandsumPrimeArg,
  detailed: D,
  customRandomizer: Randomizer,
): RollResultOrNum<D>
export function randsum(
  primeArg: RandsumPrimeArg,
  secondArg?: boolean | Randomizer,
  customRandomizer?: Randomizer,
): number | RollResult {
  const rollParams = digestPrimeArgIntoParameters(primeArg)

  const showDetailed = typeof secondArg === 'function' ? false : secondArg
  const randomizer = (typeof secondArg === 'function' ? secondArg : customRandomizer) || randomNumber

  const rollDie = () => randomizer(rollParams.sides)

  const initialRollTotals = Array.from(Array(rollParams.rolls)).map(rollDie)

  const [total, rollTotals] = transformRollTotalsWithParameters(initialRollTotals, rollParams, rollDie)

  const rollResult: RollResult = {
    total,
    initialRollTotals,
    rollTotals,
    ...rollParams,
    modifyInitialRoll: (callbackFunc: RollModifier) => callbackFunc(initialRollTotals.slice()),
    modifyModifiedRoll: (callbackFunc: RollModifier) => callbackFunc(rollTotals.slice()),
  }

  return showDetailed ? rollResult : total
}

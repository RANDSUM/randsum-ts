import { transformRollTotalsWithParameters } from 'transformRollTotalsWithParameters'
import { Randomizer, RandsumPrimeArg, RollModifier, RollOptions, RollResult, RollResultOrNum } from 'types'
import { digestPrimeArgIntoParameters } from 'digestPrimeArgIntoParameters'
import { randomNumber } from 'utils'

export function randsum(sides: number): number
export function randsum(sides: string): number
export function randsum(rollOptions: RollOptions): number
export function randsum(sides: number, customRandomizer: Randomizer): number
export function randsum(sides: string, customRandomizer: Randomizer): number
export function randsum(rollOptions: RollOptions, customRandomizer: Randomizer): number
export function randsum<D extends boolean>(sides: number, detailed: D): RollResultOrNum<D>
export function randsum<D extends boolean>(sides: string, detailed: D): RollResultOrNum<D>
export function randsum<D extends boolean>(rollOptions: RollOptions, detailed: D): RollResultOrNum<D>
export function randsum<D extends boolean>(sides: number, detailed: D, customRandomizer: Randomizer): RollResultOrNum<D>
export function randsum<D extends boolean>(sides: string, detailed: D, customRandomizer: Randomizer): RollResultOrNum<D>
export function randsum<D extends boolean>(
  rollOptions: RollOptions,
  detailed: D,
  customRandomizer: Randomizer,
): RollResultOrNum<D>
export function randsum(
  primeArg: RandsumPrimeArg,
  secondArg?: boolean | Randomizer,
  customRandomizer?: Randomizer,
): number | RollResult {
  const showDetailed = typeof secondArg === 'function' ? false : secondArg
  const randomizer = (typeof secondArg === 'function' ? secondArg : customRandomizer) || randomNumber

  const rollParams = digestPrimeArgIntoParameters(primeArg)

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

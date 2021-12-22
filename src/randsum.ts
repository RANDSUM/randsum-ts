import { transformRollTotalsWithParameters } from 'transformRollTotalsWithParameters'
import { RandsumOptions, RandsumPrimeArg, RollModifier, RollOptions, RollResult, RollResultOrNum } from 'types'
import { digestPrimeArgIntoParameters } from 'digestPrimeArgIntoParameters'
import { randomNumber } from 'utils'

export function randsum(sides: number | string): number
export function randsum(rollOptions: RollOptions): number
export function randsum(sides: number | string, { customRandomizer }: Pick<RandsumOptions, 'customRandomizer'>): number
export function randsum(
  rollOptions: RollOptions,
  { customRandomizer }: Pick<RandsumOptions, 'customRandomizer'>,
): number
export function randsum<D extends boolean>(
  sides: number | string,
  { detailed }: Pick<RandsumOptions<D>, 'detailed'>,
): RollResultOrNum<D>
export function randsum<D extends boolean>(
  rollOptions: RollOptions,
  { detailed }: RandsumOptions<D>,
): RollResultOrNum<D>
export function randsum<D extends boolean>(sides: number | string, randsumOpts: RandsumOptions<D>): RollResultOrNum<D>
export function randsum<D extends boolean>(rollOptions: RollOptions, randsumOpts: RandsumOptions<D>): RollResultOrNum<D>
export function randsum(
  primeArg: RandsumPrimeArg,
  { detailed, customRandomizer }: RandsumOptions = {},
): number | RollResult {
  const randomizer = customRandomizer || randomNumber

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

  return detailed ? rollResult : total
}

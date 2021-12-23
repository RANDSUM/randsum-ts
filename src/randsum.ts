import { transformRollTotalsWithParameters } from 'transformRollTotalsWithParameters'
import {
  DiceNotation,
  RandsumOptions,
  RandsumPrimeArg,
  RollModifier,
  RollOptions,
  RollResult,
  RollResultOrNum,
} from 'types'
import { digestPrimeArgIntoParameters } from 'digestPrimeArgIntoParameters'
import { randomNumber } from 'utils'

export function randsum(sides: number | string): number
export function randsum(notation: DiceNotation): number
export function randsum(rollOptions: RollOptions): number
export function randsum(sides: number | string, randsumOpts: Pick<RandsumOptions, 'customRandomizer'>): number
export function randsum(notation: DiceNotation, randsumOpts: Pick<RandsumOptions, 'customRandomizer'>): number
export function randsum(rollOptions: RollOptions, randsumOpts: Pick<RandsumOptions, 'customRandomizer'>): number
export function randsum<D extends boolean>(sides: number | string, randsumOpts: RandsumOptions<D>): RollResultOrNum<D>
export function randsum<D extends boolean>(notation: DiceNotation, randsumOpts: RandsumOptions<D>): RollResultOrNum<D>
export function randsum<D extends boolean>(rollOptions: RollOptions, randsumOpts: RandsumOptions<D>): RollResultOrNum<D>
export function randsum(
  primeArg: RandsumPrimeArg,
  { detailed, customRandomizer }: RandsumOptions = {},
): number | RollResult {
  const rollParams = digestPrimeArgIntoParameters(primeArg)

  const rollDie = () => (customRandomizer || randomNumber)(rollParams.sides)

  const initialRollTotals = rollParams?.rollTotals || [...Array(rollParams.rolls)].map(rollDie)

  const [total, rollTotals] = transformRollTotalsWithParameters(initialRollTotals, rollParams, rollDie)

  return detailed
    ? {
        total,
        initialRollTotals,
        rollTotals,
        ...rollParams,
        modifyInitialRoll: (callbackFunc: RollModifier) => callbackFunc(initialRollTotals.slice()),
        modifyModifiedRoll: (callbackFunc: RollModifier) => callbackFunc(rollTotals.slice()),
      }
    : total
}

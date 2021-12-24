import { generateRolls } from 'generateRolls'
import { parseArgs } from 'parseArgs'
import {
  DiceNotation,
  RandsumOptions,
  RandsumPrimeArg,
  RollModifier,
  RollOptions,
  RollResult,
  RollResultOrNum,
  Sides,
} from 'types'
import { randomNumber } from 'utils'

export function randsum(sides: Sides): number
export function randsum(notation: DiceNotation): number
export function randsum(rollOptions: RollOptions): number
export function randsum(sides: Sides, randsumOptions: Pick<RandsumOptions, 'customRandomizer'>): number
export function randsum(notation: DiceNotation, randsumOptions: Pick<RandsumOptions, 'customRandomizer'>): number
export function randsum(rollOptions: RollOptions, randsumOptions: Pick<RandsumOptions, 'customRandomizer'>): number
export function randsum<D extends boolean>(sides: Sides, randsumOptions: RandsumOptions<D>): RollResultOrNum<D>
export function randsum<D extends boolean>(
  notation: DiceNotation,
  randsumOptions: RandsumOptions<D>,
): RollResultOrNum<D>
export function randsum<D extends boolean>(
  rollOptions: RollOptions,
  randsumOptions: RandsumOptions<D>,
): RollResultOrNum<D>
export function randsum(primeArgument: RandsumPrimeArg, randsumOptions?: RandsumOptions): number | RollResult {
  const { customRandomizer, detailed } = randsumOptions || {}
  const rollParameters = parseArgs(primeArgument)

  const rollDie = () => (customRandomizer || randomNumber)(rollParameters.sides)

  const initialRollTotals = [...new Array(rollParameters.rolls)].map(rollDie)

  const [total, rollTotals] = generateRolls(initialRollTotals, rollParameters, rollDie)

  return detailed
    ? {
        total,
        args: [primeArgument, randsumOptions],
        initialRollTotals,
        rollTotals,
        ...rollParameters,
        modifyInitialRolls: (callbackFunction: RollModifier) => callbackFunction([...initialRollTotals]),
        modifyModifiedRolls: (callbackFunction: RollModifier) => callbackFunction([...rollTotals]),
      }
    : total
}

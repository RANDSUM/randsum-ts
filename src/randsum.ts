import { generateRolls } from 'generateRolls'
import { parseArguments } from 'parseArguments'
import {
  DiceNotation,
  RandsumOptions,
  RandsumPrimeArgument,
  RollModifier,
  RollOptions,
  RollResult,
  RandsumDynamicReturn,
  Sides,
} from 'types'
import { randomNumber } from 'utils'

export function randsum(sides: Sides): number
export function randsum(notation: DiceNotation): number
export function randsum(rollOptions: RollOptions): number
export function randsum(sides: Sides, randsumOptions: Pick<RandsumOptions, 'customRandomizer'>): number
export function randsum(notation: DiceNotation, randsumOptions: Pick<RandsumOptions, 'customRandomizer'>): number
export function randsum(rollOptions: RollOptions, randsumOptions: Pick<RandsumOptions, 'customRandomizer'>): number
export function randsum<D extends boolean>(sides: Sides, randsumOptions: RandsumOptions<D>): RandsumDynamicReturn<D>
export function randsum<D extends boolean>(
  notation: DiceNotation,
  randsumOptions: RandsumOptions<D>,
): RandsumDynamicReturn<D>
export function randsum<D extends boolean>(
  rollOptions: RollOptions,
  randsumOptions: RandsumOptions<D>,
): RandsumDynamicReturn<D>
export function randsum(primeArgument: RandsumPrimeArgument, randsumOptions?: RandsumOptions): number | RollResult {
  const { customRandomizer, detailed } = randsumOptions || {}
  const rollParameters = parseArguments(primeArgument)

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

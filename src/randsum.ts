import { generateRolls } from 'generateRolls'
import { parseArguments } from 'parseArguments'
import {
  DiceNotation,
  NumberString,
  RandsumDynamicReturn,
  RandsumOptions,
  RandsumPrimeArgument,
  RollOptions,
  RollResult,
} from 'types'

export function randsum(sides: NumberString): number
export function randsum(notation: DiceNotation): number
export function randsum(rollOptions: RollOptions): number
export function randsum(sides: NumberString, randsumOptions: Pick<RandsumOptions, 'customRandomizer'>): number
export function randsum(notation: DiceNotation, randsumOptions: Pick<RandsumOptions, 'customRandomizer'>): number
export function randsum(rollOptions: RollOptions, randsumOptions: Pick<RandsumOptions, 'customRandomizer'>): number
export function randsum<D extends boolean>(
  sides: NumberString,
  randsumOptions: RandsumOptions<D>,
): RandsumDynamicReturn<D>
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
  const { sides, rolls, ...rollParameters } = parseArguments(primeArgument)

  const randomizer = customRandomizer || (max => Math.floor(Math.random() * Number(max)) + 1)
  const rollDie = () => randomizer(sides)

  const initialRollTotals = [...new Array(rolls)].map(() => rollDie())
  const [total, rollTotals] = generateRolls(initialRollTotals, { sides, rolls, ...rollParameters }, rollDie)

  return detailed
    ? {
        total,
        args: [primeArgument, randsumOptions],
        initialRollTotals,
        rollTotals,
        sides,
        rolls,
        ...rollParameters,
        modifyInitialRolls: callbackFunction => callbackFunction([...initialRollTotals]),
        modifyModifiedRolls: callbackFunction => callbackFunction([...rollTotals]),
      }
    : total
}

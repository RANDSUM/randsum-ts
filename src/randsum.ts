import { generateRolls } from 'generateRolls'
import { parseArguments } from 'parseArguments'
import { DiceNotation, NumberString, PrimeArgument, RandsumOptionsWithoutSides, RollOptions, RollResult } from 'types'

export function randsum(sides: NumberString): number
export function randsum(notation: DiceNotation): number
export function randsum(rollOptions: RollOptions): number
export function randsum(sides: NumberString, randsumOptions: RandsumOptionsWithoutSides<false>): number
export function randsum(notation: DiceNotation, randsumOptions: RandsumOptionsWithoutSides<false>): number
export function randsum<D extends boolean>(
  sides: NumberString,
  randsumOptions: RandsumOptionsWithoutSides<D>,
): RollResult
export function randsum<D extends boolean>(
  notation: DiceNotation,
  randsumOptions: RandsumOptionsWithoutSides<D>,
): RollResult
export function randsum<D extends boolean>(
  primeArgument: PrimeArgument,
  randsumOptions?: RandsumOptionsWithoutSides<D>,
): RollResult | number {
  const { sides, rolls, detailed, customRandomizer, ...rollParameters } = parseArguments(primeArgument, randsumOptions)

  const randomizer = customRandomizer || (max => Math.floor(Math.random() * Number(max)) + 1)
  const rollDie = () => randomizer(sides)

  const initialRollTotals = [...new Array(rolls)].map(() => rollDie())
  const [total, rollTotals] = generateRolls(initialRollTotals, { sides, rolls, ...rollParameters }, rollDie)

  const result: RollResult = {
    total,
    initialRollTotals,
    rollTotals,
    sides,
    rolls,
    ...rollParameters,
    modifyInitialRolls: callbackFunction => callbackFunction([...initialRollTotals]),
    modifyModifiedRolls: callbackFunction => callbackFunction([...rollTotals]),
  }

  return detailed ? result : total
}

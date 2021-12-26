import { generateRolls } from 'generateRolls'
import { parseArguments } from 'parseArguments'
import { DiceNotation, NumberString, RandsumOptions, RollOptions, RollResult, UserOptions } from 'types'

/**
 * ```typescript
 * randsum(6) // return a number from 1-6
 * randsum('6') // return a number from 1-6
 * ```
 */
export function randsum(sides: NumberString): number
/**
 * ```typescript
 * randsum(6, {plus: 2}) // return a random number from 1-6, then add 2
 * randsum('6', {plus: 2}) // return a random number from 1-6, then add 2
 * ```
 */
export function randsum(sides: NumberString, randsumOptions: Omit<RandsumOptions<false>, 'sides'>): number
/**
 * ```typescript
 * randsum(6, {detailed: true}) // generates a detailed Roll Result, with the details of rolling a Six-Sided Die
 * randsum('6', {detailed: true}) // generates a detailed Roll Result, with the details of rolling a Six-Sided Die
 * ```
 */
export function randsum(sides: NumberString, randsumOptions: Omit<RandsumOptions<true>, 'sides'>): RollResult
/**
 * ```typescript
 * randsum('2d6') // returns the sum of two random numbers from 1-6
 * ```
 */
export function randsum(notation: DiceNotation): number
/**
 * ```typescript
 * randsum('2d6+2', {customRandomizer: () => 5}) // returns the sum of two random numbers using the customRandomizer, plus 2, minus 1
 * ```
 */
export function randsum(notation: DiceNotation, randsumOptions: UserOptions<false>): number
/**
 * ```typescript
 * randsum('2d6', {detailed: true}) // generates a detailed Roll Result, with the details of rolling 2 Six-Sided Die
 * ```
 */
export function randsum(notation: DiceNotation, randsumOptions: UserOptions<true>): RollResult
/**
 * ```typescript
 * randsum({sides: 6, rolls: 2}) // returns the sum of two random numbers from 1-6
 * ```
 */
export function randsum(rollOptions: RandsumOptions<false>): number
/**
 * ```typescript
 * randsum({rolls: 2, sides: 6, detailed: true}) // generates a detailed Roll Result, with the details of rolling 2 Six-Sided Die
 * ```
 */
export function randsum(rollOptions: RandsumOptions<true>): RollResult
export function randsum(
  primeArgument: NumberString | RollOptions | DiceNotation,
  randsumOptions?: Omit<RandsumOptions, 'sides'>,
): RollResult | number {
  const { sides, rolls, detailed, customRandomizer, ...rollParameters } = parseArguments(primeArgument, randsumOptions)

  const randomizer = customRandomizer || ((max: number) => Math.floor(Math.random() * Number(max)) + 1)
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

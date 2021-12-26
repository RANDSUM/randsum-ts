import { generateRolls } from 'generateRolls'
import { parseArguments } from 'parseArguments'
import { DiceNotation, NumberString, RollOptions, RollResult, UserOptions } from 'types'

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
export function randsum(sides: NumberString, randsumOptions: Omit<RollOptions, 'sides'> & UserOptions<false>): number
/**
 * ```typescript
 * randsum(6, {detailed: true}) // generates a detailed Roll Result, with the details of rolling a Six-Sided Die
 * randsum('6', {detailed: true}) // generates a detailed Roll Result, with the details of rolling a Six-Sided Die
 * ```
 */
export function randsum(sides: NumberString, randsumOptions: Omit<RollOptions, 'sides'> & UserOptions<true>): RollResult
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
export function randsum(rollOptions: RollOptions & UserOptions<false>): number
/**
 * ```typescript
 * randsum({rolls: 2, sides: 6, detailed: true}) // generates a detailed Roll Result, with the details of rolling 2 Six-Sided Die
 * ```
 */
export function randsum(rollOptions: RollOptions & UserOptions<true>): RollResult
/**
 * `randsum` is a Function that returns random numbers, and is designed to be flexible.
 *
 * At its most basic, you can give it a number, and it will return a random number from one to the number you passed in.
 *
 * ```typescript
 * randsum(20) // 18. Or, 4. Or 12. Really, any number between 1-20.
 * ```
 *
 * You can also pass it strings of numbers...
 *
 * ```typescript
 * randsum('20')
 * ```
 *
 * ... or Randsum Dice Notation (check out the docs here) ...
 *
 * ```typescript
 * randsum('2d20H') // Roll 2 D20, Drop the Highest - ooh, disadvantage. Bummer.
 * ```
 *
 * ... or  ...
 *
 * ```typescript
 * randsum('2d20H') // Roll 2 D20, Drop the Highest - ooh, disadvantage. Bummer.
 * ```
 * @category Exports
 */
export function randsum(
  primeArgument: NumberString | (RollOptions & UserOptions) | DiceNotation,
  randsumOptions?: Omit<RollOptions & UserOptions, 'sides'>,
): RollResult | number {
  const { detailed, customRandomizer, ...rollParameters } = parseArguments(primeArgument, randsumOptions)

  const rollOne = () =>
    (customRandomizer || ((max: number) => Math.floor(Math.random() * Number(max)) + 1))(rollParameters.sides)

  const initialRollTotals = [...new Array(rollParameters.rolls)].map(() => rollOne())

  const [total, rollTotals] = generateRolls(initialRollTotals, rollParameters, rollOne)

  const result: RollResult = {
    total,
    initialRollTotals,
    rollTotals,
    ...rollParameters,
    modifyInitialRolls: callbackFunction => callbackFunction([...initialRollTotals]),
    modifyModifiedRolls: callbackFunction => callbackFunction([...rollTotals]),
  }

  return detailed ? result : total
}

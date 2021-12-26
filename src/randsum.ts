import { generateRolls } from 'generateRolls'
import { parseArguments } from 'parseArguments'
import { DiceNotation, NumberString, RollOptions, RollResult, UserOptions } from 'types'

export function randsum(sides: NumberString): number
export function randsum(sides: NumberString, randsumOptions: Omit<RollOptions, 'sides'> & UserOptions<false>): number
export function randsum(sides: NumberString, randsumOptions: Omit<RollOptions, 'sides'> & UserOptions<true>): RollResult
export function randsum(notation: DiceNotation): number
export function randsum(notation: DiceNotation, randsumOptions: UserOptions<false>): number
export function randsum(notation: DiceNotation, randsumOptions: UserOptions<true>): RollResult
export function randsum(rollOptions: RollOptions & UserOptions<false>): number
export function randsum(rollOptions: RollOptions & UserOptions<true>): RollResult
export function randsum(
  primeArgument: NumberString | (RollOptions & UserOptions) | DiceNotation,
  randsumOptions?: Omit<RollOptions & UserOptions, 'sides'>,
): RollResult | number {
  const { detailed, randomizer, ...rollParameters } = parseArguments(primeArgument, randsumOptions)

  const rollOne = (): number =>
    (randomizer !== undefined ? randomizer : (max: number) => Math.floor(Math.random() * Number(max)) + 1)(
      rollParameters.sides,
    )

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

  return detailed === true ? result : total
}

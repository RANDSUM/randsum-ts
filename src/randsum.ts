import { modifyRolls } from './modifyRolls'
import { parseArguments } from './parseArguments'
import { DiceNotation, NumberString, RandsumOptions, RollResult, UserOptions } from './types'
import { defaultRandomizer } from './utils'

export function randsum(sides: NumberString): number
export function randsum(sides: NumberString, randsumOptions: Omit<RandsumOptions<false>, 'sides'>): number
export function randsum(sides: NumberString, randsumOptions: Omit<RandsumOptions<true>, 'sides'>): RollResult
export function randsum(notation: DiceNotation): number
export function randsum(notation: DiceNotation, randsumOptions: UserOptions<false>): number
export function randsum(notation: DiceNotation, randsumOptions: UserOptions<true>): RollResult
export function randsum(rollOptions: RandsumOptions<false>): number
export function randsum(rollOptions: RandsumOptions<true>): RollResult
export function randsum(
  primeArgument: NumberString | RandsumOptions | DiceNotation,
  randsumOptions?: Omit<RandsumOptions, 'sides'>,
): RollResult | number {
  const { detailed, randomizer = defaultRandomizer, ...rollParameters } = parseArguments(primeArgument, randsumOptions)

  const rollOne = (): number => randomizer(rollParameters.sides)

  const initialRolls = [...new Array(rollParameters.quantity)].map(() => rollOne())

  const result = modifyRolls(initialRolls, rollParameters, rollOne)

  return detailed === true ? result : result.total
}

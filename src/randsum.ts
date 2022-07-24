import { generateResult } from './generateResult'
import { parseArguments } from './parseArguments'
import {
  DiceNotation,
  NumberString,
  RandsumOptions,
  RandsumOptionsWithoutSides,
  RollResult,
  UserOptions,
} from './types'

export function randsum(sides: NumberString): number
export function randsum(sides: NumberString, randsumOptions: RandsumOptionsWithoutSides<false>): number
export function randsum(sides: NumberString, randsumOptions: RandsumOptionsWithoutSides<true>): RollResult
export function randsum(notation: DiceNotation): number
export function randsum(notation: DiceNotation, userOptions: UserOptions<false>): number
export function randsum(notation: DiceNotation, userOptions: UserOptions<true>): RollResult
export function randsum(rollOptions: RandsumOptions<false>): number
export function randsum(rollOptions: RandsumOptions<true>): RollResult
export function randsum(
  primeArgument: NumberString | RandsumOptions | DiceNotation,
  randsumOptions?: RandsumOptionsWithoutSides | UserOptions,
) {
  const rollParameters = parseArguments(primeArgument, randsumOptions)
  const result = generateResult(rollParameters)

  return rollParameters.detailed ? result : result.total
}

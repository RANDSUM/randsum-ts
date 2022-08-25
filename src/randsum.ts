import { generateResult } from './generateResult'
import { parseArguments } from './parseArguments'
import {
  Detailed,
  DiceNotation,
  NumberString,
  RandsumOptions,
  RandsumOptionsWithoutSides,
  RollResult,
  UserOptions
} from './types'

export function randsum(sides: NumberString): number
export function randsum(
  sides: NumberString,
  randsumOptions: RandsumOptionsWithoutSides
): number
export function randsum(
  sides: NumberString,
  randsumOptions: RandsumOptionsWithoutSides<true>
): RollResult<true>
export function randsum(notation: DiceNotation): number
export function randsum(
  notation: DiceNotation,
  userOptions: UserOptions
): number
export function randsum(
  notation: DiceNotation,
  userOptions: UserOptions<true>
): RollResult<true>
export function randsum(rollOptions: RandsumOptions<false>): number
export function randsum(rollOptions: RandsumOptions<true>): RollResult<true>
export function randsum<D extends Detailed>(
  primeArgument: RandsumOptions<D> | DiceNotation | NumberString,
  randsumOptions?: RandsumOptionsWithoutSides<D> | UserOptions<D>
): RollResult<D> | number {
  const result = generateResult<D>(
    parseArguments<D>(primeArgument, randsumOptions)
  )

  return result.rollParameters.detailed ? result : result.total
}

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
export function randsum(
  sides: NumberString,
  randsumOptions: RandsumOptionsWithoutSides<false>
): number
export function randsum(
  sides: NumberString,
  randsumOptions: RandsumOptionsWithoutSides<true>
): RollResult
export function randsum(notation: DiceNotation): number
export function randsum(
  notation: DiceNotation,
  userOptions: UserOptions<false>
): number
export function randsum(
  notation: DiceNotation,
  userOptions: UserOptions<true>
): RollResult
export function randsum(rollOptions: RandsumOptions<false>): number
export function randsum(rollOptions: RandsumOptions<true>): RollResult
export function randsum<D extends boolean>(
  primeArgument: NumberString | RandsumOptions<D> | DiceNotation,
  randsumOptions?: RandsumOptionsWithoutSides<D> | UserOptions<D>
): RollResult | number {
  const { detailed, ...rollParameters } = parseArguments<D>(
    primeArgument,
    randsumOptions
  )
  const result = generateResult(rollParameters)

  return detailed ? result : result.total
}

import { generateResult } from './generateResult'
import { parseArguments } from './parseArguments'
import {
  DiceNotation,
  NumberString,
  PrimeArgument,
  RandsumOptions,
  RandsumOptionsWithCustomSides,
  RandsumOptionsWithoutSides,
  RollResult,
  SecondArgument,
  UserOptions
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
export function randsum(
  rollOptions: RandsumOptionsWithCustomSides<false>
): string
export function randsum(rollOptions: RandsumOptions<true>): RollResult
export function randsum(
  rollOptions: RandsumOptionsWithCustomSides<true>
): RollResult<string>
export function randsum<D extends boolean>(
  primeArgument: PrimeArgument<D>,
  randsumOptions?: SecondArgument<D>
): RollResult<string | number> | number | string {
  const { detailed, ...rollParameters } = parseArguments(
    primeArgument,
    randsumOptions
  )
  const result = generateResult(rollParameters)

  return detailed ? result : result.total
}

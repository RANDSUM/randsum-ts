import { generateResult } from './generateResult'
import { parseArguments } from './parseArguments'
import {
  Detailed,
  DiceNotation,
  NumberString,
  RandsumOptions,
  RandsumOptionsWithCustomSides,
  RandsumOptionsWithoutSides,
  RollResult,
  RollResultWithCustomSides,
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
): RollResult
export function randsum(notation: DiceNotation): number
export function randsum(
  notation: DiceNotation,
  userOptions: UserOptions
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
): RollResultWithCustomSides
export function randsum(
  primeArgument:
    | RandsumOptions<Detailed>
    | RandsumOptionsWithCustomSides<Detailed>
    | DiceNotation
    | NumberString,
  randsumOptions?: RandsumOptionsWithoutSides<Detailed> | UserOptions<Detailed>
): RollResult | RollResultWithCustomSides | number | string {
  const { detailed, ...parameters } = parseArguments(
    primeArgument,
    randsumOptions
  )
  const result = generateResult(parameters)

  return detailed ? result : result.total
}

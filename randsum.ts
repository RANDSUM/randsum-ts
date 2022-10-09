import { generateResult } from 'generate-result'
import { parseArguments } from 'parse-arguments'
import {
  DiceNotation,
  NumberString,
  RandsumOptions,
  SecondaryRandsumOptions,
  RollResult,
  UserOptions,
  CustomSidesDie,
  StandardDie,
  Detailed,
  RandsumArguments,
  Simple
} from 'types'

// Sides Arguments
export function randsum(
  sides: NumberString,
  randsumOptions?: SecondaryRandsumOptions<StandardDie, Simple>
): number
export function randsum(
  sides: NumberString,
  randsumOptions: SecondaryRandsumOptions<CustomSidesDie, Simple>
): string
export function randsum(
  sides: NumberString,
  randsumOptions: SecondaryRandsumOptions<StandardDie, Detailed>
): RollResult<StandardDie>
export function randsum(
  sides: NumberString,
  randsumOptions: SecondaryRandsumOptions<CustomSidesDie, Detailed>
): RollResult<CustomSidesDie>

// Notation arguments
export function randsum(
  notation: DiceNotation<StandardDie>,
  userOptions?: UserOptions<Simple>
): number
export function randsum(
  notation: DiceNotation<CustomSidesDie>,
  userOptions?: UserOptions<Simple>
): string
export function randsum(
  notation: DiceNotation<StandardDie>,
  userOptions: UserOptions<Detailed>
): RollResult<StandardDie>
export function randsum(
  notation: DiceNotation<CustomSidesDie>,
  userOptions: UserOptions<Detailed>
): RollResult<CustomSidesDie>

// Option argument
export function randsum(
  rollOptions: RandsumOptions<StandardDie, Simple>
): number
export function randsum(
  rollOptions: RandsumOptions<CustomSidesDie, Simple>
): string
export function randsum(
  rollOptions: RandsumOptions<StandardDie, Detailed>
): RollResult<StandardDie>
export function randsum(
  rollOptions: RandsumOptions<CustomSidesDie, Detailed>
): RollResult<CustomSidesDie>

// Implementation
export function randsum(
  primeArgument: RandsumArguments['primeArgument'],
  secondArgument?: RandsumArguments['secondArgument']
): RollResult<StandardDie> | RollResult<CustomSidesDie> | number | string {
  const { detailed, ...parameters } = parseArguments(
    primeArgument,
    secondArgument
  )

  const result: RollResult<StandardDie> | RollResult<CustomSidesDie> = {
    ...generateResult(parameters),
    arguments: [primeArgument, secondArgument]
  }

  return detailed ? result : result.total
}
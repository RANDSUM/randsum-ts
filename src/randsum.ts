import { generateResult } from './generateResult'
import { parseArguments } from './parseArguments'
import {
  DetailedType,
  DiceNotation,
  NumberString,
  RandsumOptions,
  SecondaryRandsumOptions,
  RollResult,
  UserOptions,
  CustomSidesDie,
  DieType,
  StandardDie,
  Detailed
} from './types'

// Sides Arguments
export function randsum(sides: NumberString): number
export function randsum(
  sides: NumberString,
  randsumOptions: SecondaryRandsumOptions
): number
export function randsum(
  sides: NumberString,
  randsumOptions: SecondaryRandsumOptions<StandardDie, Detailed>
): RollResult
export function randsum(
  sides: NumberString,
  randsumOptions: SecondaryRandsumOptions<CustomSidesDie>
): string
export function randsum(
  sides: NumberString,
  randsumOptions: SecondaryRandsumOptions<CustomSidesDie, Detailed>
): RollResult<CustomSidesDie>

// Notation arguments
export function randsum(notation: DiceNotation): number
export function randsum(notation: DiceNotation<CustomSidesDie>): string
export function randsum(
  notation: DiceNotation,
  userOptions: UserOptions
): number
export function randsum(
  notation: DiceNotation,
  userOptions: UserOptions<Detailed>
): RollResult
export function randsum(
  notation: DiceNotation<CustomSidesDie>,
  userOptions: UserOptions
): string
export function randsum(
  notation: DiceNotation<CustomSidesDie>,
  userOptions: UserOptions<Detailed>
): RollResult<CustomSidesDie>

// Option argument
export function randsum(rollOptions: RandsumOptions<StandardDie>): number
export function randsum(rollOptions: RandsumOptions<CustomSidesDie>): string
export function randsum(
  rollOptions: RandsumOptions<StandardDie, Detailed>
): RollResult
export function randsum(
  rollOptions: RandsumOptions<CustomSidesDie, Detailed>
): RollResult<CustomSidesDie>

// Implementation
export function randsum(
  primeArgument:
    | RandsumOptions<DieType, DetailedType>
    | DiceNotation<DieType>
    | NumberString,
  randsumOptions?:
    | SecondaryRandsumOptions<DieType, DetailedType>
    | UserOptions<DetailedType>
): RollResult<DieType> | number | string {
  const { detailed, ...parameters } = parseArguments(
    primeArgument,
    randsumOptions
  )
  const result = generateResult(parameters)

  return detailed ? result : result.total
}

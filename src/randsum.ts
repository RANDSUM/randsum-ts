import { generateResult } from './generateResult'
import { parseArguments } from './parseArguments'
import {
  DiceNotation,
  NumberString,
  RandsumOptions,
  SecondaryRandsumOptions,
  RollResult,
  UserOptions,
  CustomSidesDie,
  DieType,
  StandardDie,
  Detailed,
  RandsumArguments
} from './types'

// Sides Arguments
export function randsum(sides: NumberString): number
export function randsum(
  sides: NumberString,
  randsumOptions: SecondaryRandsumOptions
): number
export function randsum<N extends StandardDie>(
  sides: NumberString,
  randsumOptions: SecondaryRandsumOptions<N, Detailed>
): RollResult<N>
export function randsum(
  sides: NumberString,
  randsumOptions: SecondaryRandsumOptions<CustomSidesDie>
): string
export function randsum<N extends CustomSidesDie>(
  sides: NumberString,
  randsumOptions: SecondaryRandsumOptions<N, Detailed>
): RollResult<N>

// Notation arguments
export function randsum(notation: DiceNotation): number
export function randsum(notation: DiceNotation<CustomSidesDie>): string
export function randsum(
  notation: DiceNotation,
  userOptions: UserOptions
): number
export function randsum<N extends DieType = StandardDie>(
  notation: DiceNotation,
  userOptions: UserOptions<Detailed>
): RollResult<N>
export function randsum(
  notation: DiceNotation<CustomSidesDie>,
  userOptions: UserOptions
): string
export function randsum<N extends CustomSidesDie>(
  notation: DiceNotation<N>,
  userOptions: UserOptions<Detailed>
): RollResult<N>

// Option argument
export function randsum(rollOptions: RandsumOptions<StandardDie>): number
export function randsum(rollOptions: RandsumOptions<CustomSidesDie>): string
export function randsum<N extends StandardDie>(
  rollOptions: RandsumOptions<N, Detailed>
): RollResult<N>
export function randsum<N extends DieType = CustomSidesDie>(
  rollOptions: RandsumOptions<N, Detailed>
): RollResult<N>

// Implementation
export function randsum(
  primeArgument: RandsumArguments['primeArgument'],
  randsumOptions?: RandsumArguments['secondArgument']
): RollResult | number | string {
  const { detailed, ...parameters } = parseArguments(
    primeArgument,
    randsumOptions
  )
  const result = generateResult(parameters, [primeArgument, randsumOptions])

  return detailed ? result : result.total
}

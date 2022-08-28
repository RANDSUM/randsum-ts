import { generateResult } from './generate-result'
import { parseArguments } from './parse-arguments'
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
} from './types'

// Sides Arguments
function randsum(
  sides: NumberString,
  randsumOptions?: SecondaryRandsumOptions<StandardDie, Simple>
): number
function randsum(
  sides: NumberString,
  randsumOptions: SecondaryRandsumOptions<CustomSidesDie, Simple>
): string
function randsum(
  sides: NumberString,
  randsumOptions: SecondaryRandsumOptions<StandardDie, Detailed>
): RollResult<StandardDie>
function randsum(
  sides: NumberString,
  randsumOptions: SecondaryRandsumOptions<CustomSidesDie, Detailed>
): RollResult<CustomSidesDie>

// Notation arguments
function randsum(
  notation: DiceNotation<StandardDie>,
  userOptions?: UserOptions<Simple>
): number
function randsum(
  notation: DiceNotation<CustomSidesDie>,
  userOptions?: UserOptions<Simple>
): string
function randsum(
  notation: DiceNotation<StandardDie>,
  userOptions: UserOptions<Detailed>
): RollResult<StandardDie>

function randsum(
  notation: DiceNotation<CustomSidesDie>,
  userOptions: UserOptions<Detailed>
): RollResult<CustomSidesDie>

// Option argument
function randsum(rollOptions: RandsumOptions<StandardDie, Simple>): number
function randsum(rollOptions: RandsumOptions<CustomSidesDie, Simple>): string
function randsum(
  rollOptions: RandsumOptions<StandardDie, Detailed>
): RollResult<StandardDie>
function randsum(
  rollOptions: RandsumOptions<CustomSidesDie, Detailed>
): RollResult<CustomSidesDie>

// Implementation
function randsum(
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

export { randsum as default }

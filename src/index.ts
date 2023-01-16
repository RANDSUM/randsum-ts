import generateResult from 'generate-result'
import parseArguments from 'parse-arguments'
import {
  CustomSidesDie,
  Detailed,
  DiceNotation,
  NumberString,
  RandsumArguments,
  RandsumOptions,
  RollResult,
  SecondaryRandsumOptions,
  Simple,
  StandardDie,
  UserOptions
} from 'types'

// Number Or String Overloads
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

// Dice Notation Overloads
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

// Roll Options Overrides
function randsum(rollOptions: RandsumOptions<StandardDie, Simple>): number
function randsum(rollOptions: RandsumOptions<CustomSidesDie, Simple>): string
function randsum(
  rollOptions: RandsumOptions<StandardDie, Detailed>
): RollResult<StandardDie>
function randsum(
  rollOptions: RandsumOptions<CustomSidesDie, Detailed>
): RollResult<CustomSidesDie>

// Base Implementation
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

export default randsum

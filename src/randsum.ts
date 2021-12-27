import { modifyRolls } from './modifyRolls'
import { parseArguments } from './parseArguments'
import { DiceNotation, NumberString, RandsumOptions, RollResult, UserOptions } from './types'

export function randsum(sides: NumberString): number
export function randsum(sides: NumberString, randsumOptions: Omit<RandsumOptions<false>, 'sides'>): number
export function randsum(sides: NumberString, randsumOptions: Omit<RandsumOptions<true>, 'sides'>): RollResult
export function randsum(notation: DiceNotation): number
export function randsum(notation: DiceNotation, randsumOptions: UserOptions<false>): number
export function randsum(notation: DiceNotation, randsumOptions: UserOptions<true>): RollResult
export function randsum(rollOptions: RandsumOptions<false>): number
export function randsum(rollOptions: RandsumOptions<true>): RollResult
export function randsum(
  primeArgument: NumberString | RandsumOptions | DiceNotation,
  randsumOptions?: Omit<RandsumOptions, 'sides'>,
): RollResult | number {
  const { detailed, randomizer, ...rollParameters } = parseArguments(primeArgument, randsumOptions)

  const rollOne = (): number =>
    (randomizer !== undefined ? randomizer : (max: number) => Math.floor(Math.random() * Number(max)) + 1)(
      rollParameters.sides,
    )

  const initialRolls = [...new Array(rollParameters.quantity)].map(() => rollOne())

  const [total, rolls] = modifyRolls(initialRolls, rollParameters, rollOne)

  const result: RollResult = {
    total,
    initialRolls,
    rolls,
    rollParameters,
  }

  return detailed === true ? result : total
}

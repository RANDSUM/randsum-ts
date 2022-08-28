import { DiceNotation, RandsumOptions, DetailedType, DieType } from 'types'
import { coreNotationPattern } from './matchers'

export * from './matchers'
export * from './type-guards'

export function isDiceNotation(argument: unknown): argument is DiceNotation {
  return !!coreNotationPattern.test(String(argument))
}

export function isRandsumOptions(
  argument: unknown
): argument is RandsumOptions<DieType, DetailedType> {
  return (
    typeof argument === 'object' &&
    typeof (argument as RandsumOptions<DieType, DetailedType>).sides !==
      undefined
  )
}

export function makeRolls(quantity: number, rollOne: () => number) {
  const rolls = new Array<number>(quantity)
  for (let index = 0; index < quantity; index += 1) {
    rolls[index] = rollOne()
  }
  return rolls
}

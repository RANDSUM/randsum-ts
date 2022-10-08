import { allPatterns, coreNotationPattern } from 'patterns'
import {
  Match,
  Randomizer,
  DiceNotation,
  RandsumOptions,
  DieType,
  DetailedType
} from 'types'

export const completeRollPattern = new RegExp(
  `${allPatterns.map((pattern) => pattern.source).join('|')}`,
  'g'
)

export function findMatches(notations: string): Match[] {
  let m
  let matches: Match[] = []
  while ((m = completeRollPattern.exec(notations)) !== null) {
    if (m.groups !== null && m.groups !== undefined) {
      for (const key of Object.keys(m.groups)) {
        if (m.groups[key] !== undefined) {
          const value = m.groups[key]
          matches = [
            ...matches,
            {
              [key]:
                key === 'coreNotationMatch'
                  ? value
                  : value.toLowerCase().replace(/s+/, '')
            }
          ]
        }
      }
    }
  }
  return matches
}

export function makeRolls(quantity: number, rollOne: () => number) {
  const rolls = new Array<number>(quantity)
  for (let index = 0; index < quantity; index += 1) {
    rolls[index] = rollOne()
  }
  return rolls
}

export function defaultRandomizer(max: number): number {
  return Math.floor(Math.random() * Number(max)) + 1
}

export function rollOneFactory(sides: number, randomizer: Randomizer) {
  return function rollOne() {
    return randomizer(sides)
  }
}

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

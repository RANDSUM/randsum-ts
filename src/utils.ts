import { allPatterns, coreNotationPattern } from 'patterns'
import {
  CapModifier,
  DetailedType,
  DiceNotation,
  DieType,
  DropModifier,
  ExplodeModifier,
  Match,
  MinusModifier,
  Modifier,
  NumberStringArgument,
  PlusModifier,
  Randomizer,
  RandsumOptions,
  ReplaceModifier,
  RerollModifier,
  UniqueModifier
} from 'types'

export const completeRollPattern = new RegExp(
  `${allPatterns.map((pattern) => pattern.source).join('|')}`,
  'g'
)

export function walkNotations(notations: string, matches: Match[]): Match[] {
  const m = completeRollPattern.exec(notations)
  if (m !== null && m.groups !== null && m.groups !== undefined) {
    let newMatches = matches
    const { groups } = m

    Object.keys(groups).forEach((key) => {
      if (groups[key] !== undefined) {
        const value = groups[key]
        newMatches = [
          ...matches,
          {
            [key]:
              key === 'coreNotationMatch'
                ? value
                : value.toLowerCase().replace(/s+/, '')
          }
        ]
      }
    })
    return walkNotations(notations, newMatches)
  }
  return matches
}

export function findMatches(notations: string): Match[] {
  return walkNotations(notations, [])
}

export function makeRolls(quantity: number, rollOne: () => number): number[] {
  const rolls: number[] = Array.from({ length: quantity })
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
    (argument as RandsumOptions<DieType, DetailedType>).sides !== undefined
  )
}

function isModifierType<T extends Modifier<NumberStringArgument>>(
  argument: Modifier<NumberStringArgument>,
  key: keyof T
): argument is T {
  return (argument as T)[key] !== undefined
}

export const isRerollModifier = (
  modifier: Modifier<NumberStringArgument>
): modifier is RerollModifier<NumberStringArgument> =>
  isModifierType<RerollModifier<NumberStringArgument>>(modifier, 'reroll')

export const isUniqueModifier = (
  modifier: Modifier<NumberStringArgument>
): modifier is UniqueModifier<NumberStringArgument> =>
  isModifierType<UniqueModifier<NumberStringArgument>>(modifier, 'unique')

export const isReplaceModifier = (
  modifier: Modifier<NumberStringArgument>
): modifier is ReplaceModifier<NumberStringArgument> =>
  isModifierType<ReplaceModifier<NumberStringArgument>>(modifier, 'replace')

export const isCapModifier = (
  modifier: Modifier<NumberStringArgument>
): modifier is CapModifier<NumberStringArgument> =>
  isModifierType<CapModifier<NumberStringArgument>>(modifier, 'cap')

export const isDropModifier = (
  modifier: Modifier<NumberStringArgument>
): modifier is DropModifier<NumberStringArgument> =>
  isModifierType<DropModifier<NumberStringArgument>>(modifier, 'drop')

export const isExplodeModifier = (
  modifier: Modifier<NumberStringArgument>
): modifier is ExplodeModifier =>
  isModifierType<ExplodeModifier>(modifier, 'explode')

export const isPlusModifier = (
  modifier: Modifier<NumberStringArgument>
): modifier is PlusModifier<NumberStringArgument> =>
  isModifierType<PlusModifier<NumberStringArgument>>(modifier, 'plus')

export const isMinusModifier = <T extends NumberStringArgument>(
  modifier: Modifier<T>
): modifier is MinusModifier<T> =>
  isModifierType<MinusModifier<T>>(modifier, 'minus')

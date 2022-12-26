import {
  CapMatch,
  CapModifier,
  CoreNotationMatch,
  DetailedType,
  DiceNotation,
  DieType,
  DropConstraintsMatch,
  DropHighMatch,
  DropLowMatch,
  DropModifier,
  ExplodeMatch,
  ExplodeModifier,
  Match,
  Modifier,
  NumberStringArgument,
  PlusMatch,
  PlusModifier,
  Randomizer,
  RandsumOptions,
  ReplaceMatch,
  ReplaceModifier,
  RerollMatch,
  RerollModifier,
  UniqueMatch,
  UniqueModifier
} from 'types'

export function makeRolls(quantity: number, rollOne: () => number): number[] {
  return Array.from({ length: quantity }, rollOne)
}

export function defaultRandomizer(max: number): number {
  return Math.floor(Math.random() * Number(max)) + 1
}

export function rollOneFactory(sides: number, randomizer: Randomizer) {
  return function rollOne() {
    return randomizer(sides)
  }
}

export function isRandsumOptions(
  argument: unknown
): argument is RandsumOptions<DieType, DetailedType> {
  return (
    typeof argument === 'object' &&
    (argument as RandsumOptions<DieType, DetailedType>).sides !== undefined
  )
}

// Modifiers
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

function isMatcherType<T extends Match>(
  argument: Match,
  key: keyof T
): argument is T {
  return (argument as T)[key] !== undefined
}

// Matches
export const isCoreNotationMatch = (match: Match): match is CoreNotationMatch =>
  isMatcherType<CoreNotationMatch>(match, 'coreNotationMatch')

export const isDropHighMatch = (match: Match): match is DropHighMatch =>
  isMatcherType<DropHighMatch>(match, 'dropHighMatch')

export const isDropLowMatch = (match: Match): match is DropLowMatch =>
  isMatcherType<DropLowMatch>(match, 'dropLowMatch')

export const isDropConstraintsMatch = (
  match: Match
): match is DropConstraintsMatch =>
  isMatcherType<DropConstraintsMatch>(match, 'dropConstraintsMatch')

export const isExplodeMatch = (match: Match): match is ExplodeMatch =>
  isMatcherType<ExplodeMatch>(match, 'explodeMatch')

export const isUniqueMatch = (match: Match): match is UniqueMatch =>
  isMatcherType<UniqueMatch>(match, 'uniqueMatch')

export const isReplaceMatch = (match: Match): match is ReplaceMatch =>
  isMatcherType<ReplaceMatch>(match, 'replaceMatch')

export const isRerollMatch = (match: Match): match is RerollMatch =>
  isMatcherType<RerollMatch>(match, 'rerollMatch')

export const isCapMatch = (match: Match): match is CapMatch =>
  isMatcherType<CapMatch>(match, 'capMatch')

export const isPlusMatch = (match: Match): match is PlusMatch =>
  isMatcherType<PlusMatch>(match, 'plusMatch')

const coreNotationPattern = /(?<coreNotationMatch>^\d+[Dd](\d+|{.*}))/
const modifierRollPatterns =
  /(?<dropHighMatch>[Hh]\d*)|(?<dropLowMatch>[Ll]\d*)|(?<dropConstraintsMatch>[Dd]{?([<>|]?\d+,?)*}?)|(?<explodeMatch>!+{?([<>|]?\d+,?)*}?)|(?<uniqueMatch>[Uu]({(\d+,?)+})?)|(?<replaceMatch>[Vv]{?([<>|]?\d+=?\d+,?)*}?)|(?<rerollMatch>[Rr]{?([<>|]?\d,?)*}\d*)|(?<capMatch>[Cc]([<>|]?\d+)*)|(?<plusMatch>\+\d+)|(?<minusMatch>-\d+)/
export const completeRollPattern = new RegExp(
  `${coreNotationPattern.source}|${modifierRollPatterns.source}`,
  'g'
)

export function isDiceNotation(argument: unknown): argument is DiceNotation {
  return !!coreNotationPattern.test(String(argument))
}

export function findMatches(notations: string): Match[] {
  return [...notations.matchAll(completeRollPattern)].map<Match>(
    ({ groups: match }) => match as Match
  )
}

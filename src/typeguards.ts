import { coreNotationPattern } from 'patterns'
import {
  CapModifier,
  DetailedType,
  DiceNotation,
  DieType,
  DropModifier,
  ExplodeModifier,
  MinusModifier,
  Modifier,
  NumberStringArgument,
  PlusModifier,
  RandsumOptions,
  ReplaceModifier,
  RerollModifier,
  UniqueModifier
} from 'types'

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

function isModifierType<T extends Modifier<number>>(
  argument: Modifier<NumberStringArgument>,
  key: keyof T
): argument is T {
  return (argument as T)[key] !== undefined
}

export const isRerollModifier = (
  modifier: Modifier<number>
): modifier is RerollModifier<number> =>
  isModifierType<RerollModifier<number>>(modifier, 'reroll')
export const isUniqueModifier = (
  modifier: Modifier<number>
): modifier is UniqueModifier<number> =>
  isModifierType<UniqueModifier<number>>(modifier, 'unique')
export const isReplaceModifier = (
  modifier: Modifier<number>
): modifier is ReplaceModifier<number> =>
  isModifierType<ReplaceModifier<number>>(modifier, 'replace')
export const isCapModifier = (
  modifier: Modifier<number>
): modifier is CapModifier<number> =>
  isModifierType<CapModifier<number>>(modifier, 'cap')
export const isDropModifier = (
  modifier: Modifier<number>
): modifier is DropModifier<number> =>
  isModifierType<DropModifier<number>>(modifier, 'drop')
export const isExplodeModifier = (
  modifier: Modifier<number>
): modifier is ExplodeModifier =>
  isModifierType<ExplodeModifier>(modifier, 'explode')
export const isPlusModifier = (
  modifier: Modifier<number>
): modifier is PlusModifier<number> =>
  isModifierType<PlusModifier<number>>(modifier, 'plus')
export const isMinusModifier = (
  modifier: Modifier<number>
): modifier is MinusModifier<number> =>
  isModifierType<MinusModifier<number>>(modifier, 'minus')

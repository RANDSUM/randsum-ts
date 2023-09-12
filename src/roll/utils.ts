import { CustomSidesDie, StandardDie } from '../Die'
import {
  CapModifier,
  DropModifier,
  ExplodeModifier,
  MinusModifier,
  Modifier,
  PlusModifier,
  ReplaceModifier,
  RerollModifier,
  UniqueModifier
} from '../types/options'
import { InclusiveOrNumber } from '../types/primitives'

const isModifierType = <M extends Modifier<InclusiveOrNumber>>(
  argument: Modifier<InclusiveOrNumber>,
  key: keyof M
): argument is M => (argument as M)[key] !== undefined

export const isCapModifier = <N extends InclusiveOrNumber>(
  modifier: Modifier<N>
): modifier is CapModifier<N> => isModifierType<CapModifier<N>>(modifier, 'cap')

export const isDropModifier = <N extends InclusiveOrNumber>(
  modifier: Modifier<N>
): modifier is DropModifier<N> =>
  isModifierType<DropModifier<N>>(modifier, 'drop')

export const isRerollModifier = <N extends InclusiveOrNumber>(
  modifier: Modifier<N>
): modifier is RerollModifier<N> =>
  isModifierType<RerollModifier<N>>(modifier, 'reroll')

export const isReplaceModifier = <N extends InclusiveOrNumber>(
  modifier: Modifier<N>
): modifier is ReplaceModifier<N> =>
  isModifierType<ReplaceModifier<N>>(modifier, 'replace')

export const isUniqueModifier = <N extends InclusiveOrNumber>(
  modifier: Modifier<N>
): modifier is UniqueModifier<N> =>
  isModifierType<UniqueModifier<N>>(modifier, 'unique')

export const isExplodeModifier = (
  modifier: Modifier<InclusiveOrNumber>
): modifier is ExplodeModifier =>
  isModifierType<ExplodeModifier>(modifier, 'explode')

export const isPlusModifier = <N extends InclusiveOrNumber>(
  modifier: Modifier<N>
): modifier is PlusModifier<N> =>
  isModifierType<PlusModifier<N>>(modifier, 'plus')

export const isMinusModifier = <N extends InclusiveOrNumber>(
  modifier: Modifier<N>
): modifier is MinusModifier<N> =>
  isModifierType<MinusModifier<N>>(modifier, 'minus')

export function generateInitialRolls(dice: StandardDie[]): number[]
export function generateInitialRolls(dice: CustomSidesDie[]): string[]
export function generateInitialRolls<D extends string | number>(
  dice: D extends number ? StandardDie[] : CustomSidesDie[]
): D extends number ? number[] : string[]
export function generateInitialRolls(
  dice: StandardDie[] | CustomSidesDie[]
): number[] | string[] {
  return dice.map((die) => die.roll()) as number[] | string[]
}

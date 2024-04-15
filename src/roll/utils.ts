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

const isModifierType = <M extends Modifier>(
  argument: Modifier,
  key: keyof M
): argument is M => (argument as M)[key] !== undefined

export const isCapModifier = (modifier: Modifier): modifier is CapModifier =>
  isModifierType<CapModifier>(modifier, 'cap')

export const isDropModifier = (modifier: Modifier): modifier is DropModifier =>
  isModifierType<DropModifier>(modifier, 'drop')

export const isRerollModifier = (
  modifier: Modifier
): modifier is RerollModifier =>
  isModifierType<RerollModifier>(modifier, 'reroll')

export const isReplaceModifier = (
  modifier: Modifier
): modifier is ReplaceModifier =>
  isModifierType<ReplaceModifier>(modifier, 'replace')

export const isUniqueModifier = (
  modifier: Modifier
): modifier is UniqueModifier =>
  isModifierType<UniqueModifier>(modifier, 'unique')

export const isExplodeModifier = (
  modifier: Modifier
): modifier is ExplodeModifier =>
  isModifierType<ExplodeModifier>(modifier, 'explode')

export const isPlusModifier = (modifier: Modifier): modifier is PlusModifier =>
  isModifierType<PlusModifier>(modifier, 'plus')

export const isMinusModifier = (
  modifier: Modifier
): modifier is MinusModifier => isModifierType<MinusModifier>(modifier, 'minus')

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

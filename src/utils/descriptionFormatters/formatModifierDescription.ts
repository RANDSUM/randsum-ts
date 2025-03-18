import { isValidModifier } from '~src/guards/isValidModifier'
import type { RollOptions } from '~types'
import { capString } from './capString'
import { dropString } from './dropString'
import { explodeString } from './explodeString'
import { minusString } from './minusString'
import { plusString } from './plusString'
import { replaceString } from './replaceString'
import { rerollString } from './rerollString'
import { uniqueString } from './uniqueString'

export function formatModifierDescriptions({
  modifiers
}: RollOptions): string[] {
  if (!isValidModifier(modifiers)) return []

  const modifierStrings = []

  if (modifiers.cap)
    capString(modifiers.cap).forEach((str) => modifierStrings.push(str))
  if (modifiers.drop)
    dropString(modifiers.drop).forEach((str) => modifierStrings.push(str))
  if (modifiers.replace)
    replaceString(modifiers.replace).forEach((str) => modifierStrings.push(str))
  if (modifiers.reroll)
    rerollString(modifiers.reroll).forEach((str) => modifierStrings.push(str))
  if (modifiers.explode) modifierStrings.push(explodeString())
  if (modifiers.unique) modifierStrings.push(uniqueString(modifiers.unique))
  if (modifiers.plus) modifierStrings.push(plusString(modifiers.plus))
  if (modifiers.minus) modifierStrings.push(minusString(modifiers.minus))

  return modifierStrings
}

import { isValidModifier } from '~src/guards/isValidModifier'
import type { RollOptions } from '~types'
import { capNotation } from './capNotation'
import { dropNotation } from './dropNotation'
import { explodeNotation } from './explodeNotation'
import { minusNotation } from './minusNotation'
import { plusNotation } from './plusNotation'
import { replaceNotation } from './replaceNotation'
import { rerollNotation } from './rerollNotation'
import { uniqueNotation } from './uniqueNotation'

export function formatModifierNotation({ modifiers }: RollOptions): string {
  if (!isValidModifier(modifiers)) return ''

  const modifierStrings = []

  if (modifiers.cap) modifierStrings.push(capNotation(modifiers.cap))
  if (modifiers.drop) modifierStrings.push(dropNotation(modifiers.drop))
  if (modifiers.replace)
    modifierStrings.push(replaceNotation(modifiers.replace))
  if (modifiers.reroll) modifierStrings.push(rerollNotation(modifiers.reroll))
  if (modifiers.explode) modifierStrings.push(explodeNotation())
  if (modifiers.unique) modifierStrings.push(uniqueNotation(modifiers.unique))
  if (modifiers.plus) modifierStrings.push(plusNotation(modifiers.plus))
  if (modifiers.minus) modifierStrings.push(minusNotation(modifiers.minus))

  return modifierStrings.join('')
}

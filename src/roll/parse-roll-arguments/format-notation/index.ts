import { DiceNotation, DicePoolOptions } from '~types'
import {
  capNotation,
  dropNotation,
  explodeNotation,
  minusNotation,
  plusNotation,
  replaceNotation,
  rerollNotation,
  uniqueNotation
} from './notationFormatters'
import { isValidModifier } from '../guards'

function formatModifierNotation({
  modifiers
}: DicePoolOptions<string> | DicePoolOptions<number>): string {
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

function formatCoreNotation({
  quantity,
  sides
}: DicePoolOptions<string | number>) {
  const formattedSides = Array.isArray(sides)
    ? `{${sides.map((s) => (s === '' ? ' ' : s)).join('')}}`
    : sides
  return `${quantity}d${formattedSides}`
}

function formatNotation(
  options: DicePoolOptions<number> | DicePoolOptions<string>
): DiceNotation<string> | DiceNotation<number> {
  return `${formatCoreNotation(options)}${formatModifierNotation(options)}` as
    | DiceNotation<string>
    | DiceNotation<number>
}

export default formatNotation

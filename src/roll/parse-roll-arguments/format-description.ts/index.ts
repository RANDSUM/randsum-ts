import { DicePoolOptions } from '~types'
import {
  rerollString,
  explodeString,
  uniqueString,
  plusString,
  minusString,
  replaceString,
  dropString,
  capString
} from './stringFormatters'

function formatModifierDescriptions({
  modifiers
}: DicePoolOptions<number | string>): string[] {
  if (!modifiers) return []

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

function formatCoreDescriptions({
  sides,
  quantity
}: DicePoolOptions<number | string>) {
  const base = `Roll ${quantity}`
  if (Array.isArray(sides)) {
    const formattedSides = `Die with the following sides: (${sides
      .map((s) => (s === '' ? ' ' : s))
      .join(',')})`
    return `${base} ${formattedSides}`
  }

  return `${base} ${sides}-sided die`
}

function formatDescription(options: DicePoolOptions<number | string>) {
  return [
    formatCoreDescriptions(options),
    ...formatModifierDescriptions(options)
  ]
}

export default formatDescription

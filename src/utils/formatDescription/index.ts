import { RandsumRollOptions } from '~types'
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
import { isValidModifier } from '~guards'

function formatModifierDescriptions({
  modifiers
}: RandsumRollOptions<number | string>): string[] {
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

function formatCoreDescriptions({
  sides,
  quantity
}: RandsumRollOptions<number | string>) {
  const base = `Roll ${quantity}`
  const descriptor = (quantity || 1) > 1 ? 'dice' : 'die'
  if (Array.isArray(sides)) {
    const formattedSides = `${descriptor} with the following sides: (${sides
      .map((s) => (s === '' ? ' ' : s))
      .join(',')})`
    return `${base} ${formattedSides}`
  }

  return `${base} ${sides}-sided ${descriptor}`
}

function formatDescription(options: RandsumRollOptions<number | string>) {
  return [
    formatCoreDescriptions(options),
    ...formatModifierDescriptions(options)
  ]
}

export { formatDescription }

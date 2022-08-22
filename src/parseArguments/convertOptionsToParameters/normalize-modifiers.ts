import { Modifier } from 'types'

import { convertDropOptionsToParameters } from './convert-drop-options-to-parameters'
import { convertGreaterLessOptionsToParameters } from './convert-greater-less-options-to-parameters'
import { convertReplaceOptionsToParameters } from './convert-replace-options-to-parameters'
import { convertRerollOptionsToParameters } from './convert-reroll-options-to-parameters'

export function normalizeModifiers(
  modifiers: Array<Modifier<'inclusive' | number>> = []
): Array<Modifier<number>> {
  const newModifiers: Array<Modifier<number>> = []
  for (const modifier of modifiers) {
    const [key] = Object.keys(modifier)
    const [value] = Object.values(modifier)

    if (key === 'cap') {
      newModifiers.push({ cap: convertGreaterLessOptionsToParameters(value) })
    }
    if (key === 'drop') {
      newModifiers.push({ drop: convertDropOptionsToParameters(value) })
    }
    if (key === 'reroll') {
      newModifiers.push({
        reroll: Array.isArray(value)
          ? value.map((option) => convertRerollOptionsToParameters(option))
          : convertRerollOptionsToParameters(value),
      })
    }
    if (key === 'replace') {
      newModifiers.push({
        replace: Array.isArray(value)
          ? value.map((option) => convertReplaceOptionsToParameters(option))
          : convertReplaceOptionsToParameters(value),
      })
    }
    if (key === 'unique') {
      newModifiers.push({
        unique:
          typeof value === 'object'
            ? { notUnique: value.notUnique.map(Number) }
            : value,
      })
    }
    if (key === 'explode') {
      newModifiers.push({ explode: value })
    }
    if (key === 'plus') {
      newModifiers.push({ plus: Number(value) })
    }
    if (key === 'minus') {
      newModifiers.push({ minus: Number(value) })
    }
  }
  return newModifiers
}

import { Modifier } from '../../types'
import { convertCapOptionsToParameters } from './convert-cap-options-to-parameters'
import { convertDropOptionsToParameters } from './convert-drop-options-to-parameters'
import { convertReplaceOptionsToParameters } from './convert-replace-options-to-parameters'
import { convertRerollOptionsToParameters } from './convert-reroll-options-to-parameters'

export function normalizeModifiers(modifiers: Array<Modifier<'inclusive' | number>> = []): Array<Modifier<number>> {
  const newModifiers: Array<Modifier<number>> = []
  for (const modifier of modifiers) {
    const [key] = Object.keys(modifier)
    const [value] = Object.values(modifier)

    switch (key) {
      case 'cap':
        newModifiers.push({ cap: convertCapOptionsToParameters(value) })
        break
      case 'drop':
        newModifiers.push({ drop: convertDropOptionsToParameters(value) })
        break
      case 'reroll':
        newModifiers.push({
          reroll: Array.isArray(value)
            ? value.map(option => convertRerollOptionsToParameters(option))
            : convertRerollOptionsToParameters(value),
        })
        break
      case 'replace':
        newModifiers.push({
          replace: Array.isArray(value)
            ? value.map(option => convertReplaceOptionsToParameters(option))
            : convertReplaceOptionsToParameters(value),
        })
        break
      case 'unique':
        newModifiers.push({
          unique:
            typeof value === 'object' ? { notUnique: value.notUnique.map((number: number) => Number(number)) } : value,
        })
        break
      case 'explode':
        newModifiers.push({ explode: value })
        break
      case 'plus':
        newModifiers.push({ plus: Number(value) })
        break
      case 'minus':
        newModifiers.push({ minus: Number(value) })
        break
    }
  }
  return newModifiers
}

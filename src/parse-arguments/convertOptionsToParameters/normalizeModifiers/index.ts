import {
  isCapModifier,
  isDropModifier,
  isExplodeModifier,
  isMinusModifier,
  isPlusModifier,
  isReplaceModifier,
  isRerollModifier,
  isUniqueModifier
} from 'typeguards'
import { Modifier } from 'types'

import convertDropOptionsToParameters from './convert-drop-options-to-parameters'
import convertGreaterLessOptionsToParameters from './convert-greater-less-options-to-parameters'
import convertReplaceOptionsToParameters from './convert-replace-options-to-parameters'
import convertRerollOptionsToParameters from './convert-reroll-options-to-parameters'

export default function normalizeModifiers(
  modifiers: Array<Modifier<'inclusive' | number>> = []
): Array<Modifier<number>> {
  const newModifiers: Array<Modifier<number>> = []

  modifiers.forEach((modifier) => {
    if (isCapModifier(modifier)) {
      newModifiers.push({
        cap: convertGreaterLessOptionsToParameters(modifier.cap)
      })
    }

    if (isDropModifier(modifier)) {
      newModifiers.push({ drop: convertDropOptionsToParameters(modifier.drop) })
    }
    if (isRerollModifier(modifier)) {
      newModifiers.push({
        reroll: Array.isArray(modifier.reroll)
          ? modifier.reroll.map((option) =>
              convertRerollOptionsToParameters(option)
            )
          : convertRerollOptionsToParameters(modifier.reroll)
      })
    }
    if (isReplaceModifier(modifier)) {
      newModifiers.push({
        replace: Array.isArray(modifier.replace)
          ? modifier.replace.map((option) =>
              convertReplaceOptionsToParameters(option)
            )
          : convertReplaceOptionsToParameters(modifier.replace)
      })
    }
    if (isUniqueModifier(modifier)) {
      newModifiers.push({
        unique:
          typeof modifier.unique === 'object'
            ? { notUnique: modifier.unique.notUnique.map(Number) }
            : modifier.unique
      })
    }
    if (isExplodeModifier(modifier)) {
      newModifiers.push({ explode: modifier.explode })
    }
    if (isPlusModifier(modifier)) {
      newModifiers.push({ plus: Number(modifier.plus) })
    }
    if (isMinusModifier(modifier)) {
      newModifiers.push({ minus: Number(modifier.minus) })
    }
  })
  return newModifiers
}

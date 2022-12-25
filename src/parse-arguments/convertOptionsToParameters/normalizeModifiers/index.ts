import { Modifier } from 'types'
import {
  isCapModifier,
  isDropModifier,
  isExplodeModifier,
  isMinusModifier,
  isPlusModifier,
  isReplaceModifier,
  isRerollModifier,
  isUniqueModifier
} from 'utils'

import convertDropOptionsToParameters from './convert-drop-options-to-parameters'
import convertGreaterLessOptionsToParameters from './convert-greater-less-options-to-parameters'
import convertReplaceOptionsToParameters from './convert-replace-options-to-parameters'
import convertRerollOptionsToParameters from './convert-reroll-options-to-parameters'

export default function normalizeModifiers(
  modifiers: Array<Modifier<'inclusive' | number>> = []
): Array<Modifier<number>> {
  return modifiers.map((modifier) => {
    if (isCapModifier(modifier)) {
      return {
        cap: convertGreaterLessOptionsToParameters(modifier.cap)
      }
    }

    if (isDropModifier(modifier)) {
      return { drop: convertDropOptionsToParameters(modifier.drop) }
    }
    if (isRerollModifier(modifier)) {
      return {
        reroll: Array.isArray(modifier.reroll)
          ? modifier.reroll.map((option) =>
              convertRerollOptionsToParameters(option)
            )
          : convertRerollOptionsToParameters(modifier.reroll)
      }
    }
    if (isReplaceModifier(modifier)) {
      return {
        replace: Array.isArray(modifier.replace)
          ? modifier.replace.map((option) =>
              convertReplaceOptionsToParameters(option)
            )
          : convertReplaceOptionsToParameters(modifier.replace)
      }
    }
    if (isUniqueModifier(modifier)) {
      return {
        unique:
          typeof modifier.unique === 'object'
            ? { notUnique: modifier.unique.notUnique.map(Number) }
            : modifier.unique
      }
    }
    if (isExplodeModifier(modifier)) {
      return { explode: modifier.explode }
    }
    if (isPlusModifier(modifier)) {
      return { plus: Number(modifier.plus) }
    }
    if (isMinusModifier(modifier)) {
      return { minus: Number(modifier.minus) }
    }
    throw new Error('Unknown Modifier')
  })
}

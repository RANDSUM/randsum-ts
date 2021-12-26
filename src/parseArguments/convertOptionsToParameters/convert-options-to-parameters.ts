import { RandsumOptions, RollParameters } from 'types'

import { convertCapOptionsToParameters } from './convert-cap-options-to-parameters'
import { convertDropOptionsToParameters } from './convert-drop-options-to-parameters'
import { convertReplaceOptionsToParameters } from './convert-replace-options-to-parameters'
import { convertRerollOptionsToParameters } from './convert-reroll-options-to-parameters'

export function convertOptionsToParameters({
  rolls,
  plus,
  minus,
  sides,
  cap,
  drop,
  replace,
  reroll,
  unique,
  ...restOptions
}: Partial<RandsumOptions>): Partial<RollParameters> {
  let rollParameters: Partial<RollParameters> = { ...restOptions }

  if (rolls) {
    rollParameters = { ...rollParameters, rolls: Number(rolls) }
  }

  if (sides) {
    rollParameters = { ...rollParameters, sides: Number(sides) }
  }

  if (plus) {
    rollParameters = { ...rollParameters, plus: Number(plus) }
  }

  if (minus) {
    rollParameters = { ...rollParameters, minus: Number(minus) }
  }

  if (cap) {
    rollParameters = { ...rollParameters, cap: convertCapOptionsToParameters(cap) }
  }

  if (drop) {
    rollParameters = { ...rollParameters, drop: convertDropOptionsToParameters(drop) }
  }

  if (replace) {
    rollParameters = {
      ...rollParameters,
      replace: Array.isArray(replace)
        ? replace.map(option => convertReplaceOptionsToParameters(option))
        : convertReplaceOptionsToParameters(replace),
    }
  }

  if (reroll) {
    rollParameters = {
      ...rollParameters,
      reroll: Array.isArray(reroll)
        ? reroll.map(option => convertRerollOptionsToParameters(option))
        : convertRerollOptionsToParameters(reroll),
    }
  }

  if (unique) {
    rollParameters = {
      ...rollParameters,
      unique: typeof unique === 'object' ? { notUnique: unique.notUnique.map(number => Number(number)) } : unique,
    }
  }

  return rollParameters
}

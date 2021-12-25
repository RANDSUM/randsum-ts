import { RollOptions } from 'types'

import { convertCapOptionsToParameters } from './convert-cap-options-to-parameters'
import { convertDropOptionsToParameters } from './convert-drop-options-to-parameters'
import { convertReplaceOptionsToParameters } from './convert-replace-options-to-parameters'
import { convertRerollOptionsToParameters } from './convert-reroll-options-to-parameters'

export function convertOptionsToParameters({
  rolls,
  sides,
  plus,
  minus,
  cap,
  drop,
  replace,
  reroll,
  unique,
  ...restOptions
}: RollOptions<'options'>): RollOptions<'parameters'> {
  return {
    ...restOptions,
    rolls: rolls ? Number(rolls) : undefined,
    sides: Number(sides),
    plus: plus ? Number(plus) : undefined,
    minus: minus ? Number(minus) : undefined,
    cap: cap ? convertCapOptionsToParameters(cap) : undefined,
    drop: drop ? convertDropOptionsToParameters(drop) : undefined,
    replace: replace
      ? Array.isArray(replace)
        ? replace.map(option => convertReplaceOptionsToParameters(option))
        : convertReplaceOptionsToParameters(replace)
      : undefined,
    reroll: reroll
      ? Array.isArray(reroll)
        ? reroll.map(option => convertRerollOptionsToParameters(option))
        : convertRerollOptionsToParameters(reroll)
      : undefined,
    unique: typeof unique === 'object' ? { notUnique: unique.notUnique.map(number => Number(number)) } : unique,
  }
}

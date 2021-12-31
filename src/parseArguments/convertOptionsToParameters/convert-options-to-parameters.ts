import { UserOptions } from '../..'
import { NewRollParameters, RandsumOptions } from '../../types'
import { mergeModifier } from '../utils'
import { convertCapOptionsToParameters } from './convert-cap-options-to-parameters'
import { convertDropOptionsToParameters } from './convert-drop-options-to-parameters'
import { convertReplaceOptionsToParameters } from './convert-replace-options-to-parameters'
import { convertRerollOptionsToParameters } from './convert-reroll-options-to-parameters'

export function convertOptionsToParameters({
  quantity,
  plus,
  minus,
  sides,
  cap,
  drop,
  replace,
  reroll,
  unique,
  explode,
  ...restOptions
}: Partial<RandsumOptions>): Partial<NewRollParameters> & UserOptions {
  let rollParameters: NewRollParameters = { sides: 1, quantity: 1, ...restOptions }

  if (quantity !== undefined) {
    rollParameters = { ...rollParameters, quantity: Number(quantity) }
  }

  if (sides !== undefined) {
    rollParameters = { ...rollParameters, sides: Number(sides) }
  }

  if (cap !== undefined) {
    rollParameters = mergeModifier({ cap: convertCapOptionsToParameters(cap) }, rollParameters)
  }

  if (explode !== undefined) {
    rollParameters = mergeModifier({ explode }, rollParameters)
  }

  if (drop !== undefined) {
    rollParameters = mergeModifier({ drop: convertDropOptionsToParameters(drop) }, rollParameters)
  }

  if (replace !== undefined) {
    rollParameters = mergeModifier(
      {
        replace: Array.isArray(replace)
          ? replace.map(option => convertReplaceOptionsToParameters(option))
          : convertReplaceOptionsToParameters(replace),
      },
      rollParameters,
    )
  }

  if (reroll !== undefined) {
    rollParameters = mergeModifier(
      {
        reroll: Array.isArray(reroll)
          ? reroll.map(option => convertRerollOptionsToParameters(option))
          : convertRerollOptionsToParameters(reroll),
      },
      rollParameters,
    )
  }

  if (unique !== undefined) {
    rollParameters = mergeModifier(
      { unique: typeof unique === 'object' ? { notUnique: unique.notUnique.map(number => Number(number)) } : unique },
      rollParameters,
    )
  }

  if (plus !== undefined) {
    rollParameters = mergeModifier({ plus: Number(plus) }, rollParameters, 'total')
  }

  if (minus !== undefined) {
    rollParameters = mergeModifier({ minus: Number(minus) }, rollParameters, 'total')
  }

  return rollParameters
}

import { UserOptions } from '../..'
import { RandsumOptions, RollParameters } from '../../types'
import { mergeModifier } from '../utils'
import { convertCapOptionsToParameters } from './convert-cap-options-to-parameters'
import { convertDropOptionsToParameters } from './convert-drop-options-to-parameters'
import { convertReplaceOptionsToParameters } from './convert-replace-options-to-parameters'
import { convertRerollOptionsToParameters } from './convert-reroll-options-to-parameters'

export function convertOptionsToParameters({
  quantity,
  sides,
  modifiers = [],
  ...restOptions
}: Partial<RandsumOptions>): Partial<RollParameters> & UserOptions {
  let rollParameters: RollParameters = { sides: 1, quantity: 1, ...restOptions }

  if (quantity !== undefined) {
    rollParameters = { ...rollParameters, quantity: Number(quantity) }
  }

  if (sides !== undefined) {
    rollParameters = { ...rollParameters, sides: Number(sides) }
  }

  for (const modifier of modifiers) {
    const [key] = Object.keys(modifier)
    const [value] = Object.values(modifier)

    switch (key) {
      case 'cap':
        rollParameters = mergeModifier({ cap: convertCapOptionsToParameters(value) }, rollParameters)
        break
      case 'drop':
        rollParameters = mergeModifier({ drop: convertDropOptionsToParameters(value) }, rollParameters)
        break
      case 'reroll':
        rollParameters = mergeModifier(
          {
            reroll: Array.isArray(value)
              ? value.map(option => convertRerollOptionsToParameters(option))
              : convertRerollOptionsToParameters(value),
          },
          rollParameters,
        )
        break
      case 'unique':
        rollParameters = mergeModifier(
          {
            unique:
              typeof value === 'object'
                ? { notUnique: value.notUnique.map((number: number) => Number(number)) }
                : value,
          },
          rollParameters,
        )
        break
      case 'replace':
        rollParameters = mergeModifier(
          {
            replace: Array.isArray(value)
              ? value.map(option => convertReplaceOptionsToParameters(option))
              : convertReplaceOptionsToParameters(value),
          },
          rollParameters,
        )
        break
      case 'explode':
        rollParameters = mergeModifier({ explode: value }, rollParameters)
        break
      case 'plus':
        rollParameters = mergeModifier({ plus: Number(value) }, rollParameters)
        break
      case 'minus':
        rollParameters = mergeModifier({ minus: Number(value) }, rollParameters)
        break
    }
  }

  return rollParameters
}

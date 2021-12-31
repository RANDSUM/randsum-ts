import { UserOptions } from '../..'
import { RandsumOptions, RollParameters } from '../../types'
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
    const { modifiers = [], ...restParameters } = rollParameters

    switch (key) {
      case 'cap':
        rollParameters = {
          ...restParameters,
          modifiers: [...modifiers, { cap: convertCapOptionsToParameters(value) }],
        }
        break
      case 'drop':
        rollParameters = {
          ...restParameters,
          modifiers: [...modifiers, { drop: convertDropOptionsToParameters(value) }],
        }
        break
      case 'reroll':
        rollParameters = {
          ...restParameters,
          modifiers: [
            ...modifiers,
            {
              reroll: Array.isArray(value)
                ? value.map(option => convertRerollOptionsToParameters(option))
                : convertRerollOptionsToParameters(value),
            },
          ],
        }
        break
      case 'replace':
        rollParameters = {
          ...restParameters,
          modifiers: [
            ...modifiers,
            {
              replace: Array.isArray(value)
                ? value.map(option => convertReplaceOptionsToParameters(option))
                : convertReplaceOptionsToParameters(value),
            },
          ],
        }
        break
      case 'unique':
        rollParameters = {
          ...restParameters,
          modifiers: [
            ...modifiers,
            {
              unique:
                typeof value === 'object'
                  ? { notUnique: value.notUnique.map((number: number) => Number(number)) }
                  : value,
            },
          ],
        }
        break
      case 'explode':
        rollParameters = {
          ...restParameters,
          modifiers: [...modifiers, { explode: value }],
        }
        break
      case 'plus':
        rollParameters = {
          ...restParameters,
          modifiers: [...modifiers, { plus: Number(value) }],
        }
        break
      case 'minus':
        rollParameters = {
          ...restParameters,
          modifiers: [...modifiers, { minus: Number(value) }],
        }
        break
    }
  }

  return rollParameters
}

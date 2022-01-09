import { DiceNotation, RollParameters } from '../../types'
import { findMatches } from '../utils'
import {
  parseCapNotation,
  parseCoreNotation,
  parseDropConstraintsNotation,
  parseDropHighNotation,
  parseDropLowNotation,
  parseReplaceNotation,
  parseRerollNotation,
  parseUniqueNotation,
} from './notationParsers'

export function parseNotation(notationString: DiceNotation) {
  let rollParameters: Omit<RollParameters, 'rollOne' | 'initialRolls'> = { sides: 1, quantity: 1 }

  for (const match of findMatches(notationString.toLowerCase().replace(' ', ''))) {
    const [key] = Object.keys(match)
    const [value] = Object.values(match)
    const { modifiers = [], ...restParameters } = rollParameters

    switch (key) {
      case 'coreNotationMatch':
        rollParameters = { ...rollParameters, ...parseCoreNotation(value) }
        break
      case 'dropHighMatch':
        rollParameters = {
          ...restParameters,
          modifiers: [...modifiers, parseDropHighNotation(value)],
        }
        break
      case 'dropLowMatch':
        rollParameters = {
          ...restParameters,
          modifiers: [...modifiers, parseDropLowNotation(value)],
        }
        break
      case 'dropConstraintsMatch':
        rollParameters = {
          ...restParameters,
          modifiers: [...modifiers, parseDropConstraintsNotation(value)],
        }
        break
      case 'explodeMatch':
        rollParameters = {
          ...restParameters,
          modifiers: [...modifiers, { explode: Boolean(value) }],
        }
        break
      case 'uniqueMatch':
        rollParameters = {
          ...restParameters,
          modifiers: [...modifiers, parseUniqueNotation(value)],
        }
        break
      case 'replaceMatch':
        rollParameters = {
          ...restParameters,
          modifiers: [...modifiers, parseReplaceNotation(value)],
        }
        break
      case 'rerollMatch':
        rollParameters = {
          ...restParameters,
          modifiers: [...modifiers, parseRerollNotation(value)],
        }
        break
      case 'capMatch':
        rollParameters = {
          ...restParameters,
          modifiers: [...modifiers, parseCapNotation(value)],
        }
        break
      case 'plusMatch':
        rollParameters = {
          ...restParameters,
          modifiers: [...modifiers, { plus: Number(value.split('+')[1]) }],
        }
        break
      case 'minusMatch':
        rollParameters = {
          ...restParameters,
          modifiers: [...modifiers, { minus: Number(value.split('-')[1]) }],
        }
        break
    }
  }

  return rollParameters
}

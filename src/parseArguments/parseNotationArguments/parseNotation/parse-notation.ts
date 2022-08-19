import { DiceNotation, RollOptions } from '../../../types'
import { findMatches } from '../../utils'
import {
  parseCapNotation,
  parseCoreNotation,
  parseDropConstraintsNotation,
  parseDropHighNotation,
  parseDropLowNotation,
  parseReplaceNotation,
  parseRerollNotation,
  parseUniqueNotation
} from './notationParsers'

export function parseNotation (notationString: DiceNotation): RollOptions<number> & { quantity: number } {
  let rollParameters: RollOptions<number> & { quantity: number } = { sides: 1, quantity: 1 }

  for (const match of findMatches(notationString.toLowerCase().replace(' ', ''))) {
    const [key] = Object.keys(match)
    const [value] = Object.values(match)
    const { modifiers = [], ...restParameters } = rollParameters

    if (key === 'coreNotationMatch') {
      rollParameters = { ...rollParameters, ...parseCoreNotation(value) }
    }
    if (key === 'dropHighMatch') {
      rollParameters = {
        ...restParameters,
        modifiers: [...modifiers, parseDropHighNotation(value)]
      }
    }
    if (key === 'dropLowMatch') {
      rollParameters = {
        ...restParameters,
        modifiers: [...modifiers, parseDropLowNotation(value)]
      }
    }
    if (key === 'dropConstraintsMatch') {
      rollParameters = {
        ...restParameters,
        modifiers: [...modifiers, parseDropConstraintsNotation(value)]
      }
    }
    if (key === 'explodeMatch') {
      rollParameters = {
        ...restParameters,
        modifiers: [...modifiers, { explode: Boolean(value) }]
      }
    }
    if (key === 'uniqueMatch') {
      rollParameters = {
        ...restParameters,
        modifiers: [...modifiers, parseUniqueNotation(value)]
      }
    }
    if (key === 'replaceMatch') {
      rollParameters = {
        ...restParameters,
        modifiers: [...modifiers, parseReplaceNotation(value)]
      }
    }
    if (key === 'rerollMatch') {
      rollParameters = {
        ...restParameters,
        modifiers: [...modifiers, parseRerollNotation(value)]
      }
    }
    if (key === 'capMatch') {
      rollParameters = {
        ...restParameters,
        modifiers: [...modifiers, parseCapNotation(value)]
      }
    }
    if (key === 'plusMatch') {
      rollParameters = {
        ...restParameters,
        modifiers: [...modifiers, { plus: Number(value.split('+')[1]) }]
      }
    }
    if (key === 'minusMatch') {
      rollParameters = {
        ...restParameters,
        modifiers: [...modifiers, { minus: Number(value.split('-')[1]) }]
      }
    }
  }

  return rollParameters
}

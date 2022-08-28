import { DiceNotation, InternalRollParameters } from 'types'
import { findMatches } from 'matchers'

import {
  parseCapNotation,
  parseCoreNotation,
  parseDropConstraintsNotation,
  parseDropHighNotation,
  parseDropLowNotation,
  parseReplaceNotation,
  parseRerollNotation,
  parseUniqueNotation
} from './notation-parsers'

export function parseNotation(
  notationString: DiceNotation
): Omit<InternalRollParameters, 'randomizer'> {
  let rollParameters: Omit<InternalRollParameters, 'randomizer'> = {
    sides: 1,
    quantity: 1,
    faces: undefined,
    modifiers: []
  }

  for (const match of findMatches(notationString)) {
    const [key] = Object.keys(match)
    const [value] = Object.values(match)
    const { modifiers = [], ...restParameters } = rollParameters

    if (key === 'coreNotationMatch') {
      rollParameters = { ...rollParameters, ...parseCoreNotation(value) }
      if (rollParameters.faces !== undefined) {
        rollParameters = { ...rollParameters, modifiers: [] }
        break
      }
    }
    key === 'dropHighMatch' &&
      (rollParameters = {
        ...restParameters,
        modifiers: [...modifiers, parseDropHighNotation(value)]
      })
    key === 'dropLowMatch' &&
      (rollParameters = {
        ...restParameters,
        modifiers: [...modifiers, parseDropLowNotation(value)]
      })
    key === 'dropConstraintsMatch' &&
      (rollParameters = {
        ...restParameters,
        modifiers: [...modifiers, parseDropConstraintsNotation(value)]
      })
    key === 'explodeMatch' &&
      (rollParameters = {
        ...restParameters,
        modifiers: [...modifiers, { explode: Boolean(value) }]
      })
    key === 'uniqueMatch' &&
      (rollParameters = {
        ...restParameters,
        modifiers: [...modifiers, parseUniqueNotation(value)]
      })
    key === 'replaceMatch' &&
      (rollParameters = {
        ...restParameters,
        modifiers: [...modifiers, parseReplaceNotation(value)]
      })
    key === 'rerollMatch' &&
      (rollParameters = {
        ...restParameters,
        modifiers: [...modifiers, parseRerollNotation(value)]
      })
    key === 'capMatch' &&
      (rollParameters = {
        ...restParameters,
        modifiers: [...modifiers, parseCapNotation(value)]
      })
    key === 'plusMatch' &&
      (rollParameters = {
        ...restParameters,
        modifiers: [...modifiers, { plus: Number(value.split('+')[1]) }]
      })
    key === 'minusMatch' &&
      (rollParameters = {
        ...restParameters,
        modifiers: [...modifiers, { minus: Number(value.split('-')[1]) }]
      })
  }

  return rollParameters
}

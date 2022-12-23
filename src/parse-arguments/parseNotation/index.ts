import { DiceNotation, InternalRollParameters } from 'types'
import { findMatches } from 'utils'

import { parseCapNotation } from './notationParsers/parse-cap-notation'
import parseCoreNotation from './notationParsers/parse-core-notation'
import { parseDropConstraintsNotation } from './notationParsers/parse-drop-contstraints-notation'
import { parseDropHighNotation } from './notationParsers/parse-drop-high-notation'
import { parseDropLowNotation } from './notationParsers/parse-drop-low-notation'
import { parseReplaceNotation } from './notationParsers/parse-replace-notation'
import { parseRerollNotation } from './notationParsers/parse-reroll-notation'
import { parseUniqueNotation } from './notationParsers/parse-unique-notation'

export default function parseNotation(
  notationString: DiceNotation
): Omit<InternalRollParameters, 'randomizer'> {
  let rollParameters: Omit<InternalRollParameters, 'randomizer'> = {
    sides: 1,
    quantity: 1,
    faces: undefined,
    modifiers: []
  }

  for (const match of findMatches(notationString)) {
    const [key, value] = Object.entries(match)[0]
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

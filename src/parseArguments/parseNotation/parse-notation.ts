import { DiceNotation, RollParameters } from 'types'

import { notationParsers } from './notationParsers'

export function parseNotation(notationString: DiceNotation): RollParameters {
  const formattedNotations = notationString.toLowerCase()

  if (formattedNotations.includes(' ')) {
    throw new Error('Notation cannot include spaces.')
  }

  let rollParameters: RollParameters = { sides: 0, rolls: 1, notation: formattedNotations }

  for (const [matcher, key, parser] of notationParsers) {
    const match = formattedNotations.match(matcher)
    if (!match) {
      continue
    }
    const value = parser(match[0])

    if (Array.isArray(value)) {
      const spreadArray = (rollParameters[key] as typeof value[]) || []
      rollParameters = { ...rollParameters, [key]: [...spreadArray, ...value] }
      continue
    }
    if (typeof value === 'object') {
      const spreadObject = (rollParameters[key] as Record<string, unknown>) || {}
      rollParameters = { ...rollParameters, [key]: { ...spreadObject, ...value } }
      continue
    }

    rollParameters = {
      ...rollParameters,
      [key]: value,
    }
    continue
  }

  return rollParameters
}

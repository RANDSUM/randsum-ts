import { DiceNotation, RollParameters } from 'types'

import { notationParsers } from './notationParsers'

export function parseNotation(notationString: DiceNotation): RollParameters {
  if (notationString.includes(' ')) {
    throw new Error('Notation cannot include spaces.')
  }

  const formattedNotations = notationString.toLowerCase()
  const modifiedParameters = notationParsers.reduce(
    (parameters, [matcher, key, function_]) => {
      const match = formattedNotations.match(matcher)
      if (!match) {
        return parameters
      }
      const value = function_(match[0])

      if (Array.isArray(value)) {
        const spreadArray = (parameters[key] as typeof value[]) || []
        return { ...parameters, [key]: [...spreadArray, ...value] }
      }
      if (typeof value === 'object') {
        const spreadObject = (parameters[key] as Record<string, unknown>) || {}
        return { ...parameters, [key]: { ...spreadObject, ...value } }
      }
      return {
        ...parameters,
        [key]: value,
      }
    },
    { sides: 0 } as RollParameters,
  )

  return { ...modifiedParameters, notation: notationString }
}

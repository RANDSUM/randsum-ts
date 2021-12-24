import { DiceNotation, RollParameters } from 'types'
import { notationParsers } from './notationParsers'

export function digestNotation(notationString: DiceNotation): RollParameters {
  if (notationString.includes(' ')) {
    throw 'Notation cannot include spaces.'
  }

  const formattedNotations = notationString.toLowerCase()
  const modifiedParams = notationParsers.reduce(
    (parameters, [matcher, key, func]) => {
      const match = formattedNotations.match(matcher)
      if (!match) {
        return parameters
      }
      const value = func(match[0])

      if (Array.isArray(value)) {
        const spreadArray = (parameters[key] as typeof value[]) || []
        return { ...parameters, [key]: [...spreadArray, ...value] }
      }
      if (typeof value === 'object') {
        const spreadObj = (parameters[key] as Record<string, unknown>) || {}
        return { ...parameters, [key]: { ...spreadObj, ...value } }
      }
      return {
        ...parameters,
        [key]: value,
      }
    },
    { sides: 0 } as RollParameters,
  )

  return { ...modifiedParams, notation: notationString }
}

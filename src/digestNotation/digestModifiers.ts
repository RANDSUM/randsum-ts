import { RollParameters } from 'types'
import { notationParsers } from './notationParsers'

export function digestModifiers(modifierString: string) {
  const formattedModifiers = modifierString.toLowerCase()
  return notationParsers.reduce(
    (parameters, [matcher, key, func]) => {
      const match = formattedModifiers.match(matcher)
      if (!match) {
        return parameters
      }
      const value = func(match[0])

      if (Array.isArray(value)) {
        const spreadArray = Array.isArray(parameters[key]) ? (parameters[key] as typeof value[]) : []
        return { ...parameters, [key]: [...spreadArray, ...value] }
      }
      if (typeof value === 'object') {
        const spreadObj = typeof parameters[key] === 'object' ? (parameters[key] as Record<string, unknown>) : {}
        return { ...parameters, [key]: { ...spreadObj, ...value } }
      }
      return {
        ...parameters,
        [key]: value,
      }
    },
    { sides: 0 } as RollParameters,
  )
}

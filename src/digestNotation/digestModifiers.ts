import { notationParsers } from './notationParsers'

export function digestModifiers(modifierString: string) {
  const formattedModifiers = modifierString.toLowerCase()
  return notationParsers.reduce((parameters, [matcher, key, func]) => {
    const match = formattedModifiers.match(matcher)
    if (!match) {
      return parameters
    }
    const value = func(match[0])

    if (Array.isArray(value)) {
      return { ...parameters, [key]: value }
    }
    if (typeof value === 'object') {
      return { ...parameters, [key]: { ...(parameters[key] as Record<string, unknown>), ...value } }
    }
    return {
      ...parameters,
      [key]: value,
    }
  }, {} as Record<string, unknown>)
}

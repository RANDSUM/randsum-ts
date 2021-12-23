import { dropLow } from 'digestNotation/matchers'

export function parseDropLowNotation(modifierString: string) {
  const match = modifierString.match(dropLow)

  if (!match) {
    return {}
  }
  const lowest = Number(match[0].toLowerCase().split('l')[1]) || 1

  return { lowest }
}

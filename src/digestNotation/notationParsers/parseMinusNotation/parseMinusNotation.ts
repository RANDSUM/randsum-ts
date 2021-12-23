import { minus } from 'digestNotation/matchers'

export function parseMinusNotation(modifierString: string) {
  const match = modifierString.match(minus)

  if (!match) {
    return undefined
  }

  return Number(match[0].split('-')[1])
}

import { explode } from 'digestNotation/matchers'

export function parseExplodeNotation(modifierString: string) {
  const match = modifierString.match(explode)

  if (!match) {
    return undefined
  }

  return true
}

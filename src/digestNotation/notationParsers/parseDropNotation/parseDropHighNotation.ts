import { dropHigh } from 'digestNotation/matchers'

export function parseDropHighNotation(modifierString: string) {
  const match = modifierString.match(dropHigh)

  if (!match) {
    return {}
  }

  const highest = Number(match[0].toLowerCase().split('h')[1]) || 1

  return { highest }
}

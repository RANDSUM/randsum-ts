import { reroll } from 'digestNotation/matchers'

export function parseUniqeNotation(modifierString: string) {
  const match = modifierString.match(reroll)

  if (!match) {
    return undefined
  }

  const matchStr = match[0].toLowerCase()

  if (matchStr === 'u') {
    return true
  }

  return {
    notUnique: matchStr
      .replace('u{', '')
      .replace('}', '')
      .split(',')
      .map(num => Number(num)),
  }
}

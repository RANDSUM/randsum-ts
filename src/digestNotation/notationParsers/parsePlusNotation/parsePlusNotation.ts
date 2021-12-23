import { plus } from 'digestNotation/matchers'

export function parsePlusNotation(modifierString: string) {
  const match = modifierString.match(plus)

  if (!match) {
    return undefined
  }

  return Number(match[0].split('+')[1])
}

import { unique } from 'digestNotation/matchers'

export function parseUniqeNotation(modifierString: string) {
  const match = modifierString.match(unique)

  if (!match) {
    return undefined
  }

  const matchStr = match[0].toLowerCase()

  if (matchStr === 'u') {
    return true
  }

  const notUnique = matchStr.replace('u{', '').replace('}', '').split(',')
  console.log(notUnique)

  return {
    notUnique: notUnique.map(num => Number(num)),
  }
}

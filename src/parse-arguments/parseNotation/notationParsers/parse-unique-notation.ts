import { UniqueMatch, UniqueModifier } from 'types'

export default function parseUniqueNotation({
  uniqueMatch: notationString
}: UniqueMatch): UniqueModifier<number> {
  if (notationString === 'u') {
    return { unique: true }
  }

  const notUnique = notationString
    .replace(/u{/g, '')
    .replace(/}/g, '')
    .split(',')

  return {
    unique: {
      notUnique: notUnique.map(Number)
    }
  }
}

import { UniqueMatch, UniqueModifier } from 'types'

export default function parseUniqueNotation({
  uniqueMatch: notationString
}: UniqueMatch): UniqueModifier<number> {
  if (notationString === 'u' || notationString === 'U') {
    return { unique: true }
  }

  const notUnique = notationString
    .replace(/[Uu]{/g, '')
    .replace(/}/g, '')
    .split(',')

  return {
    unique: {
      notUnique: notUnique.map(Number)
    }
  }
}

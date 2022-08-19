import { UniqueModifier } from '../../../../types'

export function parseUniqueNotation (notationString: string): UniqueModifier<number> {
  if (notationString === 'u') {
    return { unique: true }
  }

  const notUnique = notationString.replace(/u{/g, '').replace(/}/g, '').split(',')

  return {
    unique: {
      notUnique: notUnique.map(Number)
    }
  }
}

import { RollParameters } from '../../../types'

export function parseUniqueNotation(notationString: string): Pick<RollParameters, 'unique'> {
  if (notationString === 'u') {
    return { unique: true }
  }

  const notUnique = notationString.replace(/u{/g, '').replace(/}/g, '').split(',')

  return {
    unique: {
      notUnique: notUnique.map(number => Number(number)),
    },
  }
}

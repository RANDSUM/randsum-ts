import type { ModifierOptions } from '~types'

export function parseDropHighNotation(
  notations: string[]
): Pick<ModifierOptions, 'drop'> {
  if (notations.length === 0) {
    return {}
  }

  const notationString = notations[notations.length - 1]
  const highestCount = notationString.split(/[Hh]/)[1]

  if (highestCount === '') {
    return {
      drop: { highest: 1 }
    }
  }

  return {
    drop: { highest: Number(highestCount) }
  }
}

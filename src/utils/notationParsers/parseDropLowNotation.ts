import type { ModifierOptions } from '~types'

export function parseDropLowNotation(
  notations: string[]
): Pick<ModifierOptions, 'drop'> {
  if (notations.length === 0) {
    return { drop: {} }
  }
  const notationString = notations[notations.length - 1]
  const lowestCount = notationString.split(/[Ll]/)[1]

  if (lowestCount === '') {
    return {
      drop: {
        lowest: 1
      }
    }
  }

  return {
    drop: {
      lowest: Number(lowestCount)
    }
  }
}

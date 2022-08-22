import { DropModifier } from 'types'

export function parseDropHighNotation(
  notationString: string
): DropModifier<number> {
  const highestCount = notationString.split('h')[1]

  return {
    drop: { highest: highestCount !== '' ? Number(highestCount) : 1 },
  }
}

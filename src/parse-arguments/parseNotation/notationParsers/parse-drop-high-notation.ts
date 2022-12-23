import { DropModifier } from 'types'

export function parseDropHighNotation(
  notationString: string
): DropModifier<number> {
  const highestCount = notationString.split('h')[1]

  return {
    drop: { highest: highestCount === '' ? 1 : Number(highestCount) }
  }
}

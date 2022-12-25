import { DropHighMatch, DropModifier } from 'types'

export default function parseDropHighNotation({
  dropHighMatch: notationString
}: DropHighMatch): DropModifier<number> {
  const highestCount = notationString.split('h')[1]

  return {
    drop: { highest: highestCount === '' ? 1 : Number(highestCount) }
  }
}

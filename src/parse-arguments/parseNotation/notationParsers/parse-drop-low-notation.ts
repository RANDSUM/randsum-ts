import { DropLowMatch, DropModifier } from 'types'

export default function parseDropLowNotation({
  dropLowMatch: notationString
}: DropLowMatch): DropModifier<number> {
  const lowestCount = notationString.split(/[Ll]/)[1]

  return {
    drop: {
      lowest: lowestCount === '' ? 1 : Number(lowestCount)
    }
  }
}

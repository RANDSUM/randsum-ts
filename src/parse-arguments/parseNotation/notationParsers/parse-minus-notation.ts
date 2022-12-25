import { MinusMatch, MinusModifier } from 'types'

export default function parseMinusNotation({
  minusMatch: notationString
}: MinusMatch): MinusModifier<number> {
  return { minus: Number(notationString.split('-')[1]) }
}

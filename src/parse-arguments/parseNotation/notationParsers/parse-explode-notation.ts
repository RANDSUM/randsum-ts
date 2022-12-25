import { ExplodeMatch, ExplodeModifier } from 'types'

export default function parseExplodeNotation({
  explodeMatch: notationString
}: ExplodeMatch): ExplodeModifier {
  return { explode: Boolean(notationString) }
}

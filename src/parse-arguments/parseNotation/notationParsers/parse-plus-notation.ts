import { PlusMatch, PlusModifier } from 'types'

export default function parsePlusNotation({
  plusMatch: notationString
}: PlusMatch): PlusModifier<number> {
  return { plus: Number(notationString.split('+')[1]) }
}

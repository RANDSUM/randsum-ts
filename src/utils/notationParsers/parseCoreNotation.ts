import type { RequiredNumericRollParameters } from '~types'
import { parseCoreSides } from './parseCoreSides'

export function parseCoreNotation(
  notationString: string
): RequiredNumericRollParameters {
  const [quantity, sides] = notationString.split(/[Dd]/)

  return {
    quantity: Number(quantity),
    sides: parseCoreSides(sides)
  } as RequiredNumericRollParameters
}

import type { RequiredCoreDiceParameters } from '~types'
import { parseCoreSides } from './parseCoreSides'

export function parseCoreNotation(
  notationString: string
): RequiredCoreDiceParameters {
  const [quantity, sides] = notationString.split(/[Dd]/)

  return {
    quantity: Number(quantity),
    sides: parseCoreSides(sides)
  }
}

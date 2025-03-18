import type { RequiredNumericalRolllParameters } from '~types'
import { parseCoreSides } from './parseCoreSides'

export function parseCoreNotation(
  notationString: string
): RequiredNumericalRolllParameters {
  const [quantity, sides] = notationString.split(/[Dd]/)

  return {
    quantity: Number(quantity),
    sides: parseCoreSides(sides)
  } as RequiredNumericalRolllParameters
}

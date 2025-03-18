import type { RequiredCoreNumericalDiceParameters } from '~types'
import { parseCoreSides } from './parseCoreSides'

export function parseCoreNotation(
  notationString: string
): RequiredCoreNumericalDiceParameters {
  const [quantity, sides] = notationString.split(/[Dd]/)

  return {
    quantity: Number(quantity),
    sides: parseCoreSides(sides)
  } as RequiredCoreNumericalDiceParameters
}

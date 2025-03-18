import type { DiceNotation } from '~types'

export function baseFormatCoreNotation(
  quantity: number,
  sides: string | number
): DiceNotation {
  return `${quantity}d${sides}` as DiceNotation
}

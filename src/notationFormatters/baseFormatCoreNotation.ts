import type { Notation } from '~types'

export function baseFormatCoreNotation(
  quantity: number,
  sides: string | number
): Notation {
  return `${quantity}d${sides}` as Notation
}

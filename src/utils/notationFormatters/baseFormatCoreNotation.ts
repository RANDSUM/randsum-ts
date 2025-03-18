import type { Notation } from '~types'

export function baseFormatCoreNotation<S extends string | number>(
  quantity: number,
  sides: S
): Notation<S> {
  return `${quantity}d${sides}` as Notation<S>
}

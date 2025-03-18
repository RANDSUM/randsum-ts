import type { Notation, RollOptions } from '~types'
import { baseFormatCoreNotation } from './baseFormatCoreNotation'
import { formatFaces } from './formatFaces'

export function formatCoreNotation<S extends string | number>({
  quantity = 1,
  sides
}: RollOptions<S>): Notation<S> {
  if (Array.isArray(sides)) {
    return baseFormatCoreNotation(
      quantity,
      `{${formatFaces(sides)}}`
    ) as Notation<S>
  }

  return baseFormatCoreNotation(quantity, sides) as Notation<S>
}

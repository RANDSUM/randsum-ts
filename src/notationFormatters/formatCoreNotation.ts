import type { Notation, RollOptions } from '~types'
import { baseFormatCoreNotation } from './baseFormatCoreNotation'
import { formatFaces } from './formatFaces'

export function formatCoreNotation({
  quantity = 1,
  sides
}: RollOptions<string | number>): Notation {
  if (Array.isArray(sides)) {
    return baseFormatCoreNotation(quantity, `{${formatFaces(sides)}}`)
  }

  return baseFormatCoreNotation(quantity, sides)
}

import type { Notation, RollOptions } from '~types'

export function formatCoreNotation({
  quantity = 1,
  sides
}: RollOptions<string | number>): Notation {
  const formattedSides = Array.isArray(sides)
    ? `{${sides.map((s) => (s === '' ? ' ' : s)).join('')}}`
    : sides
  return `${quantity}d${formattedSides}` as Notation
}

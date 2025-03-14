import type { RollOptions } from '~types'
import { dieDescriptor } from './dieDescriptor'

export function formatCoreDescriptions({
  sides,
  quantity
}: RollOptions<number | string>): string {
  const base = `Roll ${quantity}`
  const descriptor = dieDescriptor(quantity)
  if (Array.isArray(sides)) {
    const formattedSides = `${descriptor} with the following sides: (${sides
      .map((s) => {
        if (s === '') return ' '
        return s
      })
      .join(',')})`
    return `${base} ${formattedSides}`
  }

  return `${base} ${sides}-sided ${descriptor}`
}

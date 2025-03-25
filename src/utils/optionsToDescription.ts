import type { RollOptions } from '~types'
import { formatModifierDescriptions } from './descriptionFormatters/formatModifierDescription'

export function optionsToDescription(options: RollOptions): string[] {
  return [
    formatCoreDescriptions(options),
    ...formatModifierDescriptions(options)
  ]
}

function formatCoreDescriptions({ sides, quantity }: RollOptions): string {
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

function dieDescriptor(quantity = 1): string {
  if (quantity > 1) return 'dice'
  return 'die'
}

import type { RollOptions } from '~types'
import { formatCoreDescriptions } from './descriptionFormatters/formatCoreDescriptions'
import { formatModifierDescriptions } from './descriptionFormatters/formatModifierDescription'

export function optionsToDescription(options: RollOptions): string[] {
  return [
    formatCoreDescriptions(options),
    ...formatModifierDescriptions(options)
  ]
}

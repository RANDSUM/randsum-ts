import type { RollOptions } from '~types'
import { formatCoreDescriptions } from '~utils/descriptionFormatters/formatCoreDescriptions'
import { formatModifierDescriptions } from './descriptionFormatters/formatModifierDescription'

export function optionsToDescription(
  options: RollOptions<number | string>
): string[] {
  return [
    formatCoreDescriptions(options),
    ...formatModifierDescriptions(options)
  ]
}

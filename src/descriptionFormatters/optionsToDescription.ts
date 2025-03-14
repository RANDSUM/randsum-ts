import { formatCoreDescriptions } from '~src/descriptionFormatters/formatCoreDescriptions'
import type { RollOptions } from '~types'
import { formatModifierDescriptions } from './formatModifierDescription'

export function optionsToDescription(
  options: RollOptions<number | string>
): string[] {
  return [
    formatCoreDescriptions(options),
    ...formatModifierDescriptions(options)
  ]
}

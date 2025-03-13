import type { RollOptions } from '~types'
import {
  formatCoreDescriptions,
  formatModifierDescriptions
} from './descriptionFormatters'

export function optionsToDescription(
  options: RollOptions<number | string>
): string[] {
  return [
    formatCoreDescriptions(options),
    ...formatModifierDescriptions(options)
  ]
}

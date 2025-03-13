import type { RollOptions } from '~types'
import {
  formatCoreDescriptions,
  formatModifierDescriptions
} from './descriptionGenerators'

export function optionsToDescription(options: RollOptions<number | string>) {
  return [
    formatCoreDescriptions(options),
    ...formatModifierDescriptions(options)
  ]
}

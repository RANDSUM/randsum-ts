import { formatCoreDescriptions } from '~src/core/utils/configToDescription'
import type { CustomFacesRollConfig } from '../types'

export function customFacesConfigToDescriptions({
  quantity,
  faces,
  sides
}: CustomFacesRollConfig): string[] {
  return [
    formatCoreDescriptions({ quantity, sides }),
    `with faces: ${faces.join(', ')}`
  ]
}

import { formatCoreDescriptions } from '~src/utils/configToDescription'
import { CustomFacesRollConfig } from '../types'

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

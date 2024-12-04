import { isCustomFacesDiceNotation } from './guards'
import { CustomFacesNotationValidationResult } from './types'
import { customConfigToCustomFacesNotation } from './utils/customFacesConfigToCustomFacesNotation'
import { customFacesConfigToDescriptions } from './utils/customFacesConfigToDescription'
import { customFacesNotationToCustomFacesRollConfig } from './utils/customFacesNotationToCustomFacesRollConfig'
import { NotationValidationResult, validateNotation } from '~notation'

export function validateCustomFacesNotation(
  arg: string
): CustomFacesNotationValidationResult | NotationValidationResult {
  if (isCustomFacesDiceNotation(arg)) {
    const config = customFacesNotationToCustomFacesRollConfig(arg)
    return {
      valid: true,
      argument: arg,
      notation: customConfigToCustomFacesNotation(config),
      config,
      description: customFacesConfigToDescriptions(config)
    }
  }
  return validateNotation(arg)
}

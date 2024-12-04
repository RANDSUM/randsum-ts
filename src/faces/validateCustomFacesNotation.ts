import { NotationValidationResult } from '~src/notation/types'
import { isCustomFacesDiceNotation } from './guards'
import { CustomFacesNotationValidationResult } from './types'
import { customConfigToCustomFacesNotation } from './utils/customFacesConfigToCustomFacesNotation'
import { customFacesConfigToDescriptions } from './utils/customFacesConfigToDescription'
import { customFacesNotationToCustomFacesRollConfig } from './utils/customFacesNotationToCustomFacesRollConfig'
import { validateNotation } from '~src/notation/validateNotation'

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

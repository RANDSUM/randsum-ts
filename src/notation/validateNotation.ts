import { isDiceNotation } from './guards'
import { NotationValidationResult } from './types'
import { notationToRollConfig } from './utils/notationToRollConfig'
import { configToNotation } from './utils/configToNotation'
import { configToDescription } from '~src/core/utils/configToDescription'

function validateNotation(arg: string): NotationValidationResult {
  if (!isDiceNotation(arg)) {
    return {
      valid: false,
      argument: arg,
      notation: undefined,
      config: undefined,
      description: undefined
    }
  }

  const config = notationToRollConfig(arg)
  return {
    valid: true,
    argument: arg,
    config,
    notation: configToNotation(config),
    description: configToDescription(config)
  }
}

export { validateNotation }

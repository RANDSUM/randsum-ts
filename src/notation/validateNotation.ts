import { notationToRollConfig } from '~src/utils/notationToRollConfig'
import { isDiceNotation } from './guards'
import { NotationValidationResult } from './types'
import { configToDescription } from '~src/utils/configToDescription'
import { configToNotation } from '~src/utils/configToNotation'

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

import type { CustomRollParams, RollParams } from '~types'

export function isCustomParameters(
  poolParameters: RollParams
): poolParameters is CustomRollParams {
  return Array.isArray(poolParameters.options.sides)
}

import type { CustomRollParams, RollParams } from '~types'
import { isCustomSides } from '../sides/isCustomSides'

export function isCustomParameters(
  poolParameters: RollParams
): poolParameters is CustomRollParams {
  return isCustomSides(poolParameters.options.sides)
}
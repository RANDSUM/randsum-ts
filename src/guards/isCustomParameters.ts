import type { CustomRollParameters, RollParameters } from '~types'

export function isCustomParameters(
  poolParameters: RollParameters
): poolParameters is CustomRollParameters {
  return Array.isArray(poolParameters.options.sides)
}

import type { RollParameters } from '~types'

export function isCustomParameters(
  poolParameters: RollParameters
): poolParameters is RollParameters<string> {
  return Array.isArray(poolParameters.options.sides)
}

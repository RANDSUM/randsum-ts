import type { RollParameters } from '~types'

export function isCustomParameters(
  poolParameters: RollParameters<string | number>
): poolParameters is RollParameters<string> {
  return Array.isArray(poolParameters.options.sides)
}

import { RollModifier, RollParameters } from 'types'
import { isPlainObject } from 'utils'

export function modifierIsParamater(modifier: RollModifier | undefined): modifier is RollParameters {
  return isPlainObject(modifier)
}

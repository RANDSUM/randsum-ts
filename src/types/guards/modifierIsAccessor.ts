import { RollModifier, RollAccessor } from 'types'
import { isPlainObject } from 'utils'

export function modifierIsAccessor(modifier: RollModifier | undefined): modifier is RollAccessor {
  return isPlainObject(modifier)
}

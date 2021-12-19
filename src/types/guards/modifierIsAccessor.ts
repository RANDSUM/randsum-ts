import { RollModifier, RollAccessor } from 'types'
import { isFunction } from 'utils'

export function modifierIsAccessor(modifier: RollModifier | undefined): modifier is RollAccessor {
  return isFunction(modifier)
}

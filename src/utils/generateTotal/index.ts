import { RollAccessor, RollModifier, RollParameters } from '../../types'
import { isFunction, isPlainObject, sum } from '../../utils'
import { parameterDigester } from './parameterDigester'

export const generateTotal = (results: number[], modifier?: RollModifier) => {
  if (isPlainObject(modifier)) {
    modifier = modifier as RollParameters
    return parameterDigester(results, modifier)
  }

  if (isFunction(modifier)) {
    modifier = modifier as RollAccessor
    return modifier(results)
  }
  return sum(results)
}

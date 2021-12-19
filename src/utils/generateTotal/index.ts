import { RollModifier } from 'types'
import { sumArray } from 'utils'
import { modifierIsAccessor, modifierIsParamater } from 'types/guards'
import { parameterDigester } from './parameterDigester'

export function generateTotal(results: number[], modifier?: RollModifier) {
  if (modifierIsParamater(modifier)) {
    return parameterDigester(results, modifier)
  }

  if (modifierIsAccessor(modifier)) {
    return modifier(results)
  }
  return sumArray(results)
}

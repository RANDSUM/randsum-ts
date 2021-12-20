import { RollModifier } from 'types'
import { sumArray } from 'utils'
import { modifierIsAccessor, modifierIsParamater } from 'types/guards'
import { parameterDigester } from './parameterDigester'

export function generateTotal(sides: number, modifier?: RollModifier) {
  if (modifierIsParamater(modifier)) {
    return parameterDigester(sides, modifier)
  }

  if (modifierIsAccessor(modifier)) {
    return modifier(results)
  }
  return sumArray(results)
}

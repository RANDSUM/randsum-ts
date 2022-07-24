import { UserOptions } from '../..'
import { InternalRollParameters, RandsumOptions, RandsumOptionsWithoutSides } from '../../types'
import { normalizeModifiers } from './normalize-modifiers'

const defaultRollParameters: InternalRollParameters = {
  quantity: 1,
  sides: 20,
  detailed: false,
  modifiers: [],
  randomizer: undefined,
}

export function convertOptionsToParameters(
  options: RandsumOptions | RandsumOptionsWithoutSides | UserOptions,
): InternalRollParameters {
  const { quantity, sides, modifiers, ...restOptions } = {
    ...defaultRollParameters,
    ...options,
  }

  return {
    sides: Number(sides),
    quantity: Number(quantity),
    modifiers: normalizeModifiers(modifiers),
    ...restOptions,
  }
}

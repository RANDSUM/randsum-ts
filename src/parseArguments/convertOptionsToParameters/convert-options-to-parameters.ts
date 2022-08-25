import { InternalRollParameters } from 'types'
import {
  RandsumOptions,
  RandsumOptionsWithoutSides,
  UserOptions,
  Detailed
} from 'types'
import { defaultRandomizer } from 'utils'
import { normalizeModifiers } from './normalizeModifiers'

export function convertOptionsToParameters(
  options:
    | RandsumOptions<Detailed>
    | RandsumOptionsWithoutSides<Detailed>
    | UserOptions<Detailed>
): InternalRollParameters {
  const { sides, quantity, modifiers, randomizer } =
    options as RandsumOptions<Detailed>
  return {
    ...options,
    randomizer: randomizer || defaultRandomizer,
    sides: Number(sides),
    quantity: Number(quantity || 1),
    modifiers: normalizeModifiers(modifiers || [])
  }
}

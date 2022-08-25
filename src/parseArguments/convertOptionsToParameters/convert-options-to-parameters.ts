import { InternalRollParameters } from 'types'
import {
  RandsumOptions,
  RandsumOptionsWithoutSides,
  UserOptions,
  Detailed
} from 'types'
import { defaultRandomizer } from 'utils'
import { normalizeModifiers } from './normalizeModifiers'

export function convertOptionsToParameters<D extends Detailed>(
  options: RandsumOptions<D> | RandsumOptionsWithoutSides<D> | UserOptions<D>
): InternalRollParameters<D> {
  const { sides, quantity, modifiers, randomizer } =
    options as RandsumOptions<D>
  return {
    ...options,
    randomizer: randomizer || defaultRandomizer,
    sides: Number(sides),
    quantity: Number(quantity || 1),
    modifiers: normalizeModifiers(modifiers || [])
  }
}

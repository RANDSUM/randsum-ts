import { InternalRollParameters, RandsumOptionsWithCustomSides } from 'types'
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
    | RandsumOptionsWithCustomSides<Detailed>
    | RandsumOptionsWithoutSides<Detailed>
    | UserOptions<Detailed>
): InternalRollParameters {
  const { sides, quantity, modifiers, randomizer } = options as
    | RandsumOptions<Detailed>
    | (RandsumOptionsWithCustomSides<Detailed> & {
        modifiers: RandsumOptions<Detailed>['modifiers']
      })

  const isCustomSides = Array.isArray(sides)
  return {
    ...options,
    randomizer: randomizer || defaultRandomizer,
    sides: isCustomSides ? sides.length : Number(sides),
    quantity: Number(quantity || 1),
    modifiers: isCustomSides ? [] : normalizeModifiers(modifiers || []),
    faces: isCustomSides ? sides : undefined
  }
}

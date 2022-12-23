import {
  DetailedType,
  DieType,
  InternalRollParameters,
  RandsumOptions,
  SecondaryRandsumOptions,
  UserOptions
} from 'types'
import { defaultRandomizer } from 'utils'

import { normalizeModifiers } from './normalizeModifiers'

export function convertOptionsToParameters(
  options:
    | RandsumOptions<DieType, DetailedType>
    | SecondaryRandsumOptions<DieType, DetailedType>
    | UserOptions<DetailedType>
): InternalRollParameters {
  const { sides, quantity, modifiers, randomizer, faces } =
    options

  const isCustomSides = Array.isArray(sides)
  const providedFaces = faces !== undefined
  return {
    ...options,
    randomizer: randomizer || defaultRandomizer,
    faces: providedFaces ? faces : isCustomSides ? sides : undefined,
    sides: isCustomSides ? sides.length : Number(sides),
    quantity: Number(quantity || 1),
    modifiers: providedFaces
      ? []
      : isCustomSides
      ? []
      : normalizeModifiers(modifiers || [])
  }
}

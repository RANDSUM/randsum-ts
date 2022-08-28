import {
  CustomSides,
  DetailedType,
  DieType,
  InternalRollParameters,
  StandardDie
} from 'types'
import { RandsumOptions, SecondaryRandsumOptions, UserOptions } from 'types'
import { normalizeModifiers } from './normalize-modifiers'

export function defaultRandomizer(max: number): number {
  return Math.floor(Math.random() * Number(max)) + 1
}

export function convertOptionsToParameters(
  options:
    | RandsumOptions<DieType, DetailedType>
    | SecondaryRandsumOptions<DieType, DetailedType>
    | UserOptions<DetailedType>
): InternalRollParameters {
  const { sides, quantity, modifiers, randomizer, faces } =
    options as RandsumOptions<DieType, DetailedType> & {
      faces?: CustomSides
      modifiers: RandsumOptions<StandardDie, DetailedType>['modifiers']
    }

  const isCustomSides = Array.isArray(sides)
  const providedFaces = faces !== undefined
  return {
    ...options,
    randomizer: randomizer || defaultRandomizer,
    sides: isCustomSides ? sides.length : Number(sides),
    quantity: Number(quantity || 1),
    modifiers: providedFaces
      ? []
      : isCustomSides
      ? []
      : normalizeModifiers(modifiers || []),
    faces: providedFaces ? faces : isCustomSides ? sides : undefined
  }
}

import { InternalRollParameters, RandsumOptions } from '../types'
import normalizeModifiers from './normalize-modifiers'

export default function parseOptions(
  options: RandsumOptions
): InternalRollParameters {
  const { sides, quantity, modifiers } = {
    quantity: undefined,
    modifiers: [],
    ...options
  }

  const isCustomSides = Array.isArray(sides)
  const normalizedModifiers = isCustomSides ? [] : normalizeModifiers(modifiers)

  return {
    ...options,
    faces: isCustomSides ? sides : undefined,
    sides: isCustomSides ? sides.length : Number(sides),
    quantity: Number(quantity || 1),
    modifiers: normalizedModifiers
  }
}

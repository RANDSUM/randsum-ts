import { DieType, RollOptions, RollParameters } from '../../types'
import normalizeModifiers from './normalize-modifiers'
import { isCustomSidesRollOptions } from './utils'

const parseOptions = (
  options: RollOptions<'customSides'> | RollOptions<'standard'>
): RollParameters<DieType> => {
  if (isCustomSidesRollOptions(options)) {
    return {
      ...options,
      faces: options.sides,
      sides: options.sides.length,
      quantity: Number(options.quantity || 1),
      modifiers: [],
      initialRolls: []
    }
  }

  return {
    ...options,
    sides: Number(options.sides),
    quantity: Number(options.quantity || 1),
    modifiers: normalizeModifiers(options.modifiers || []),
    initialRolls: []
  }
}

export default parseOptions

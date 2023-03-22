import { DieType, RollOptions, RollParameters } from '../types'
import normalizeModifiers from './normalize-modifiers'
import { isCustomSidesRollOptions } from './utils'

const parseOptions = <T extends DieType>(
  options: RollOptions<T>
): RollParameters<T> => {
  const { sides, quantity, modifiers } = {
    quantity: undefined,
    modifiers: [],
    ...options
  }

  if (isCustomSidesRollOptions(options)) {
    return {
      ...options,
      faces: sides,
      sides: options.sides.length,
      quantity: Number(quantity || 1),
      modifiers: [],
      initialRolls: []
    } as RollParameters<'customSides'>
  }

  const standard: RollParameters<'standard'> = {
    ...options,
    sides: Number(sides),
    quantity: Number(quantity || 1),
    modifiers: normalizeModifiers(modifiers),
    initialRolls: []
  }

  return standard as RollParameters<T>
}

export default parseOptions

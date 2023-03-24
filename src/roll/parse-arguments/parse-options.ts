import { CustomSidesDicePool, StandardDicePool } from '../../Die'
import { RollOptions } from '../../types/options'
import { RollParameters } from '../../types/parameters'
import { generateStandardSides } from '../../utils'
import normalizeModifiers from './normalize-modifiers'
import { isCustomSidesRollOptions } from './utils'

const parseOptions = (
  options: RollOptions | RollOptions<string>
): RollParameters | RollParameters<string> => {
  const quantity = Number(options.quantity || 1)
  if (isCustomSidesRollOptions(options)) {
    const dice = [{ quantity, sides: options.sides }]
    const pool = new CustomSidesDicePool(dice)
    const initialRolls = pool.roll()
    return {
      ...options,
      dice,
      argument: options,
      faces: options.sides,
      sides: options.sides.length,
      pool,
      quantity,
      modifiers: [],
      initialRolls
    }
  }

  const dice = [{ quantity, sides: Number(options.sides) }]
  const pool = new StandardDicePool(dice)
  const initialRolls = pool.roll()
  const faces = generateStandardSides(Number(options.sides))
  return {
    ...options,
    dice,
    faces,
    argument: options,
    sides: Number(options.sides),
    quantity,
    pool,
    modifiers: normalizeModifiers(options.modifiers || []),
    initialRolls
  }
}

export default parseOptions

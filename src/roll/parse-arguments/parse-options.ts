import { CustomSidesDicePool, StandardDicePool } from '../../Die'
import { isCustomSidesRollOptions } from '../../types/guards'
import { RollOptions } from '../../types/options'
import { RollParameters } from '../../types/parameters'
import { generateStandardSides } from '../../utils'
import normalizeModifiers from './normalize-modifiers'

const parseOptions = (
  options: RollOptions | RollOptions<string>
): RollParameters | RollParameters<string> => {
  const quantity = Number(options.quantity || 1)
  if (isCustomSidesRollOptions(options)) {
    const diceOptions = [{ quantity, sides: options.sides }]
    const pool = new CustomSidesDicePool(diceOptions)
    const initialRolls = pool.roll()
    return {
      ...options,
      diceOptions,
      argument: options,
      faces: options.sides.map(String),
      sides: options.sides.length,
      pool,
      quantity,
      modifiers: [],
      initialRolls
    }
  }

  const diceOptions = [{ quantity, sides: Number(options.sides) }]
  const pool = new StandardDicePool(diceOptions)
  const initialRolls = pool.roll()
  const faces = generateStandardSides(Number(options.sides))
  return {
    ...options,
    diceOptions,
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

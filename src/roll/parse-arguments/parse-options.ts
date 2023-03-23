import { CustomSidesDicePool, StandardDicePool } from '../../Die'
import { RollOptions } from '../../types/options'
import { RollParameters } from '../../types/parameters'
import normalizeModifiers from './normalize-modifiers'
import { isCustomSidesRollOptions } from './utils'

const parseOptions = (
  options: RollOptions | RollOptions<'customSides'>
): RollParameters | RollParameters<'customSides'> => {
  const quantity = Number(options.quantity || 1)
  if (isCustomSidesRollOptions(options)) {
    const dice = [{ quantity, sides: options.sides }]
    const pool = new CustomSidesDicePool(dice)
    const initialRolls = pool.roll()
    return {
      ...options,
      argument: options,
      faces: options.sides,
      sides: options.sides.length,
      pool,
      quantity,
      modifiers: [],
      initialRolls
    }
  }

  const pool = new StandardDicePool([
    { quantity, sides: Number(options.sides) }
  ])
  const initialRolls = pool.roll()
  return {
    ...options,
    argument: options,
    sides: Number(options.sides),
    quantity,
    pool,
    modifiers: normalizeModifiers(options.modifiers || []),
    initialRolls
  }
}

export default parseOptions

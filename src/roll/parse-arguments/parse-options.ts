import { dicePoolFactory } from '../../Die'
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
    const dice = dicePoolFactory(diceOptions)
    const initialRolls = dice.map((die) => die.roll())
    return {
      ...options,
      diceOptions,
      dice,
      argument: options,
      faces: options.sides.map(String),
      sides: options.sides.length,
      quantity,
      modifiers: [],
      initialRolls
    }
  }

  const diceOptions = [{ quantity, sides: Number(options.sides) }]
  const dice = dicePoolFactory(diceOptions)
  const initialRolls = dice.map((die) => die.roll())
  const faces = generateStandardSides(Number(options.sides))
  return {
    ...options,
    diceOptions,
    dice,
    faces,
    argument: options,
    sides: Number(options.sides),
    quantity,
    modifiers: normalizeModifiers(options.modifiers || []),
    initialRolls
  }
}

export default parseOptions

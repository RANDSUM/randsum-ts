import {
  CustomSidesDie,
  InternalRollParameters,
  RollResult,
  StandardDie
} from 'types'
import {
  applyDrop,
  applyExplode,
  applyReplace,
  applyReroll,
  applySingleCap,
  applyUnique
} from './applicators'
import { generateRolls } from './generate-rolls'
import { generateTotalAndRolls } from './generate-total-and-rolls'

export function generateResult(
  { sides, quantity, modifiers, randomizer, faces }: InternalRollParameters,
  rollGenerator = generateRolls
):
  | Omit<RollResult<StandardDie>, 'arguments'>
  | Omit<RollResult<CustomSidesDie>, 'arguments'> {
  const { rollOne, initialRolls } = rollGenerator(sides, quantity, randomizer)

  let rolls = [...initialRolls]
  let simpleMathModifier = 0

  for (const modifier of modifiers) {
    const [key] = Object.keys(modifier)
    const [value] = Object.values(modifier)

    key === 'reroll' && (rolls = applyReroll(rolls, value, rollOne))
    key === 'unique' &&
      (rolls = applyUnique(rolls, { sides, quantity, unique: value }, rollOne))
    key === 'replace' && (rolls = applyReplace(rolls, value))
    key === 'cap' && (rolls = rolls.map(applySingleCap(value)))
    key === 'drop' && (rolls = applyDrop(rolls, value))
    key === 'explode' && (rolls = applyExplode(rolls, { sides }, rollOne))
    key === 'plus' && (simpleMathModifier += Number(value))
    key === 'minus' && (simpleMathModifier -= Math.abs(Number(value)))
  }

  return {
    ...generateTotalAndRolls({ faces, rolls, simpleMathModifier }),
    rollParameters: {
      sides,
      quantity,
      modifiers,
      initialRolls,
      faces,
      randomizer,
      rollOne
    }
  }
}

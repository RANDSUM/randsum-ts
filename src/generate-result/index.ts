import {
  CustomSidesDie,
  InternalRollParameters,
  RollResult,
  StandardDie
} from 'types'

import { applyDrop } from './applicators/apply-drop'
import { applyExplode } from './applicators/apply-explode'
import { applyReplace } from './applicators/apply-replace'
import { applyReroll } from './applicators/apply-reroll'
import { applySingleCap } from './applicators/apply-single-cap'
import { applyUnique } from './applicators/apply-unique'
import generateRolls from './generate-rolls'
import { generateTotalAndRolls } from './generate-total-and-rolls'

export default function generateResult(
  { sides, quantity, modifiers, randomizer, faces }: InternalRollParameters,
  rollGenerator = generateRolls
):
  | Omit<RollResult<StandardDie>, 'arguments'>
  | Omit<RollResult<CustomSidesDie>, 'arguments'> {
  const { rollOne, initialRolls } = rollGenerator(sides, quantity, randomizer)

  let rolls = [...initialRolls]
  let simpleMathModifier = 0

  for (const modifier of modifiers) {
    const [key, value] = Object.entries(modifier)[0]

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

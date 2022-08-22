
import { InternalRollParameters, RollResult } from '../types'
import { applyDrop, applyExplode, applyReplace, applyReroll, applySingleCap, applyUnique } from './applicators'
import { generateRolls } from './generate-rolls'

export function generateResult ({ sides, quantity, modifiers, randomizer }: InternalRollParameters, rollGenerator = generateRolls): RollResult {
  const { rollOne, initialRolls } = rollGenerator(sides, quantity, randomizer)

  let rolls = [...initialRolls]
  let simpleMathModifier = 0

  for (const modifier of modifiers) {
    const [key] = Object.keys(modifier)
    const [value] = Object.values(modifier)

    if (key === 'reroll') {
      rolls = applyReroll(rolls, value, rollOne)
    }
    if (key === 'unique') {
      rolls = applyUnique(rolls, { sides, quantity, unique: value }, rollOne)
    }
    if (key === 'replace') {
      rolls = applyReplace(rolls, value)
    }
    if (key === 'cap') {
      rolls = rolls.map(applySingleCap(value))
    }
    if (key === 'drop') {
      rolls = applyDrop(rolls, value)
    }
    if (key === 'explode') {
      rolls = applyExplode(rolls, { sides }, rollOne)
    }
    if (key === 'plus') {
      simpleMathModifier += Number(value)
    }
    if (key === 'minus') {
      simpleMathModifier -= Math.abs(Number(value))
    }
  }

  const total = Number([...rolls].reduce((total, roll) => total + roll, 0)) + simpleMathModifier

  return {
    total,
    rolls,
    rollParameters: {
      sides,
      quantity,
      modifiers,
      initialRolls,
      rollOne
    }
  }
}

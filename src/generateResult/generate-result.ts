import { InternalRollParameters, RollResult } from '../types'
import {
  applyDrop,
  applyExplode,
  applyReplace,
  applyReroll,
  applySingleCap,
  applyUnique
} from './applicators'
import { generateRolls } from './generate-rolls'
import { generateNumericTotal } from './generate-numeric-total'
import { generateCustomFacesTotal } from './generate-custom-faces-total'

export function generateResult(
  { sides, quantity, modifiers, randomizer, faces }: InternalRollParameters,
  rollGenerator = generateRolls
): RollResult<string | number> {
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

  const total = Array.isArray(faces)
    ? generateCustomFacesTotal({ faces, initialRolls })
    : generateNumericTotal({ rolls, simpleMathModifier })

  const finalRolls = Array.isArray(faces)
    ? rolls.map((roll) => String(faces[roll - 1]))
    : rolls

  return {
    total,
    rolls: finalRolls,
    rollParameters: {
      sides,
      quantity,
      modifiers,
      initialRolls,
      rollOne
    }
  }
}

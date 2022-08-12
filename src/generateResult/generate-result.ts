import { RollParameters, RollResult } from '../types'
import { applyDrop, applyExplode, applyReplace, applyReroll, applySingleCap, applyUnique } from './applicators'

export function generateResult({ initialRolls, rollOne, ...rollParameters }: RollParameters): RollResult {
  let modifiedRollTotals = [...initialRolls]
  let simpleMathModifier = 0

  const { sides, quantity, modifiers } = rollParameters

  for (const modifier of modifiers) {
    const [key] = Object.keys(modifier)
    const [value] = Object.values(modifier)

    if (key === 'reroll') {
      modifiedRollTotals = applyReroll(modifiedRollTotals, value, rollOne)
    }

    if (key === 'unique') {
      modifiedRollTotals = applyUnique(modifiedRollTotals, { sides, quantity, unique: value }, rollOne)
    }

    if (key === 'replace') {
      modifiedRollTotals = applyReplace(modifiedRollTotals, value)
    }
    if (key === 'cap') {
      modifiedRollTotals = modifiedRollTotals.map(applySingleCap(value))
    }

    if (key === 'drop') {
      modifiedRollTotals = applyDrop(modifiedRollTotals, value)
    }

    if (key === 'explode') {
      modifiedRollTotals = applyExplode(modifiedRollTotals, { sides }, rollOne)
    }
    if (key === 'plus') {
      simpleMathModifier = simpleMathModifier + Number(value)
    }
    if (key === 'minus') {
      simpleMathModifier = simpleMathModifier - Math.abs(Number(value))
    }
  }

  const total = Number([...modifiedRollTotals].reduce((total, roll) => total + roll, 0)) + simpleMathModifier

  return {
    total,
    rolls: modifiedRollTotals,
    rollParameters: {
      ...rollParameters,
      rollOne,
      initialRolls,
    },
  }
}

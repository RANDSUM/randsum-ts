import { RollResult } from '..'
import { RollParameters } from '../types'
import { applyDrop, applyExplode, applyReplace, applyReroll, applySingleCap, applyUnique } from './applicators'

export function modifyRolls(rolls: number[], rollParameters: RollParameters, rollOne: () => number): RollResult {
  let modifiedRollTotals = [...rolls]
  let simpleMathModifier = 0

  const { sides, quantity, modifiers = [] } = rollParameters

  for (const modifier of modifiers) {
    const [key] = Object.keys(modifier)
    const [value] = Object.values(modifier)

    switch (key) {
      case 'reroll':
        modifiedRollTotals = applyReroll(modifiedRollTotals, value, rollOne)
        break
      case 'unique':
        modifiedRollTotals = applyUnique(modifiedRollTotals, { sides, quantity, unique: value }, rollOne)
        break
      case 'replace':
        modifiedRollTotals = applyReplace(modifiedRollTotals, value)
        break
      case 'cap':
        modifiedRollTotals = modifiedRollTotals.map(applySingleCap(value))
        break
      case 'drop':
        modifiedRollTotals = applyDrop(modifiedRollTotals, value)
        break
      case 'explode':
        modifiedRollTotals = applyExplode(modifiedRollTotals, { sides }, rollOne)
        break
      case 'plus':
        simpleMathModifier = simpleMathModifier + Number(value)
        break
      case 'minus':
        simpleMathModifier = simpleMathModifier - Math.abs(Number(value))
        break
    }
  }

  const total = Number([...modifiedRollTotals].reduce((total, roll) => total + roll, 0)) + simpleMathModifier

  return {
    total,
    rolls: modifiedRollTotals,
    rollParameters,
    initialRolls: rolls,
  }
}

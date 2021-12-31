import { NewRollParameters } from '../types'
import { applyDrop, applyExplode, applyReplace, applyReroll, applySingleCap, applyUnique } from './applicators'

export function modifyRolls(
  rolls: number[],
  rollParameters: NewRollParameters,
  rollOne: () => number,
): [number, number[]] {
  let modifiedRollTotals = [...rolls]

  const { sides, quantity, rollModifiers = [], totalModifiers = [] } = rollParameters

  for (const modifier of rollModifiers) {
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
    }
  }

  let modifiedTotal = Number([...modifiedRollTotals].reduce((total, roll) => total + roll, 0))

  for (const modifier of totalModifiers) {
    const [key] = Object.keys(modifier)
    const [value] = Object.values(modifier)

    switch (key) {
      case 'plus':
        modifiedTotal = modifiedTotal + value
        break
      case 'minus':
        modifiedTotal = modifiedTotal - Math.abs(value)
        break
    }
  }

  return [modifiedTotal, modifiedRollTotals.map(number => Number(number))]
}

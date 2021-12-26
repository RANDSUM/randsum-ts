import { RollParameters } from 'types'

import { applyDrop, applyExplode, applyReplace, applyReroll, applySingleCap, applyUnique } from './applicators'

export function modifyRolls(
  rolls: number[],
  rollParameters: RollParameters,
  rollOne: () => number,
): [number, number[]] {
  let modifiedRollTotals = [...rolls]

  const { unique, explode, reroll, plus, minus, cap, sides, quantity, replace, drop } = rollParameters

  if (reroll !== undefined) {
    modifiedRollTotals = applyReroll(modifiedRollTotals, reroll, rollOne)
  }

  if (unique !== undefined) {
    modifiedRollTotals = applyUnique(modifiedRollTotals, { sides, quantity, unique }, rollOne)
  }

  if (replace !== undefined) {
    modifiedRollTotals = applyReplace(modifiedRollTotals, replace)
  }

  if (cap !== undefined) {
    modifiedRollTotals = modifiedRollTotals.map(applySingleCap(cap))
  }

  if (drop !== undefined) {
    modifiedRollTotals = applyDrop(modifiedRollTotals, drop)
  }

  if (explode !== undefined) {
    modifiedRollTotals = applyExplode(modifiedRollTotals, { sides }, rollOne)
  }

  let modifiedTotal = Number([...modifiedRollTotals].reduce((total, roll) => total + roll, 0))

  if (plus !== undefined) {
    modifiedTotal = modifiedTotal + plus
  }

  if (minus !== undefined) {
    modifiedTotal = modifiedTotal - Math.abs(minus)
  }

  return [modifiedTotal, modifiedRollTotals.map(number => Number(number))]
}

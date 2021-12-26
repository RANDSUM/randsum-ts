import { RollDie, RollParameters, RollTotals } from 'types'

import { applyDrop, applyExplode, applyReplace, applyReroll, applySingleCap, applyUnique } from './applicators'

export function generateRolls(
  rollTotals: RollTotals,
  rollParameters: RollParameters,
  rollDie: RollDie,
): [number, RollTotals] {
  let modifiedRollTotals = [...rollTotals]

  const { unique, explode, reroll, plus, minus, cap, sides, rolls, replace, drop } = rollParameters

  if (reroll !== undefined) {
    modifiedRollTotals = applyReroll(modifiedRollTotals, reroll, rollDie)
  }

  if (unique !== undefined) {
    modifiedRollTotals = applyUnique(modifiedRollTotals, { sides, rolls, unique }, rollDie)
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
    modifiedRollTotals = applyExplode(modifiedRollTotals, { sides }, rollDie)
  }

  let modifiedTotal = Number([...modifiedRollTotals].reduce((total, roll) => Number(total) + Number(roll), 0))

  if (plus !== undefined) {
    modifiedTotal = modifiedTotal + plus
  }

  if (minus !== undefined) {
    modifiedTotal = modifiedTotal - Math.abs(minus)
  }

  return [modifiedTotal, modifiedRollTotals.map(number => Number(number))]
}

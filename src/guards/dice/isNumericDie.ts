import type { Die, NumericDie } from '~types'

export function isNumericDie(die: Die): die is NumericDie {
  return die.type === 'numerical'
}
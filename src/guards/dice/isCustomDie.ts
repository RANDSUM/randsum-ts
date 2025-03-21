import type { Die, CustomDie } from '~types'

export function isCustomDie(die: Die): die is CustomDie {
  return die.type === 'custom'
}
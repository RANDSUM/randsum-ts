import type { RerollOptions } from '~types'
import { rerollRoll } from './rerollRoll'

export function applyReroll(
  rolls: number[],
  reroll: RerollOptions,
  rollOne: () => number
): number[] {
  return [...rolls].map((roll) => rerollRoll(roll, reroll, rollOne))
}

import type { RerollOptions } from '~types'
import { rerollRoll } from './rerollRoll'

export function applyReroll(
  rolls: number[],
  reroll: RerollOptions,
  rollOne: () => number
): number[] {
  const newRolls = [...rolls]
  return newRolls.map((roll) => rerollRoll(roll, reroll, rollOne))
}

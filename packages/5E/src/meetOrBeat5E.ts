import { roll5E } from './roll5E'
import type { RollArgument5E } from './types'

export function meetOrBeat5E(difficultyClass: number, rollArg: RollArgument5E) {
  return roll5E(rollArg).total >= difficultyClass
}

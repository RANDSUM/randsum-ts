import { completeRollPattern, coreNotationPattern } from '~patterns'
import type { DiceNotation } from '~types'

export function isDiceNotationArg(argument: unknown): argument is DiceNotation {
  if (typeof argument !== 'string') return false
  
  const basicTest = coreNotationPattern.test(String(argument))
  if (!basicTest) return false

  const cleanArg = argument.replace(/\s/g, '')
  return cleanArg.replace(completeRollPattern, '').length === 0
}
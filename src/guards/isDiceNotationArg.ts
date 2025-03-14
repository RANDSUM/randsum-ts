import { completeRollPattern, coreNotationPattern } from '~patterns'
import type { Notation } from '~types'

export function isDiceNotationArg(argument: unknown): argument is Notation {
  const notAString = typeof argument !== 'string'
  const basicTest = !!coreNotationPattern.test(String(argument))
  if (!basicTest || notAString) return false

  const cleanArg = argument.replace(/\s/g, '')

  return cleanArg.replace(completeRollPattern, '').length === 0
}

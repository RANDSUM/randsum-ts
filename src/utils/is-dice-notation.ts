import { DiceNotation } from 'types'

import { coreNotationPattern } from './patterns'

export function isDiceNotation (argument: unknown): argument is DiceNotation {
  return !!coreNotationPattern.test(String(argument))
}

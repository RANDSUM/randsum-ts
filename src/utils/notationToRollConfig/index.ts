import { coreNotationPattern } from '~patterns'
import { parseCoreNotation, parseModifiers } from './optionsParsers'
import { RollConfig } from '~src/types'
import { DiceNotation } from '~src/types'

export function notationToRollConfig(notationString: DiceNotation): RollConfig {
  const coreNotationMatch = notationString.match(coreNotationPattern)!.at(0)!

  return {
    ...parseCoreNotation(coreNotationMatch),
    ...parseModifiers(notationString.replace(coreNotationMatch, ''))
  }
}

export * from './optionsParsers'

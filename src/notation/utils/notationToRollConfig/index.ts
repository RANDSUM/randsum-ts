import { parseCoreNotation, parseModifiers } from './optionsParsers'
import { coreNotationPattern } from '../../patterns'
import { RollConfig } from '~types'
import { DiceNotation } from '~src/notation/types'

export function notationToRollConfig(notationString: DiceNotation): RollConfig {
  const coreNotationMatch = notationString.match(coreNotationPattern)!.at(0)!

  return {
    ...parseCoreNotation(coreNotationMatch),
    ...parseModifiers(notationString.replace(coreNotationMatch, ''))
  }
}

export * from './optionsParsers'

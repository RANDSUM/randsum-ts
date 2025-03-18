import { coreNotationPattern } from '~patterns'
import type { DiceNotation, RollOptions } from '~types'
import { parseCoreNotation } from './notationParsers/parseCoreNotation'
import { parseModifiers } from './notationParsers/parseModifiers'

export function notationToOptions(notationString: DiceNotation): RollOptions {
  const coreNotationMatch = notationString.match(coreNotationPattern)!.at(0)
  const modifiersString = notationString.replace(coreNotationMatch!, '')

  return {
    ...parseCoreNotation(coreNotationMatch!),
    ...parseModifiers(modifiersString)
  }
}

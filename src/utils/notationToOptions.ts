import { coreNotationPattern } from '~patterns'
import type { Notation, RollOptions } from '~types'
import { parseCoreNotation } from './notationParsers/parseCoreNotation'
import { parseModifiers } from './notationParsers/parseModifiers'

export function notationToOptions<S extends string | number>(
  notationString: Notation<S>
): RollOptions<S> {
  const coreNotationMatch = notationString.match(coreNotationPattern)!.at(0)
  const modifiersString = notationString.replace(coreNotationMatch!, '')

  return {
    ...parseCoreNotation(coreNotationMatch!),
    ...parseModifiers(modifiersString)
  } as RollOptions<S>
}

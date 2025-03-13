import { coreNotationPattern } from '~patterns'
import type { Notation, RollOptions } from '~types'
import { parseCoreNotation, parseModifiers } from './notationParsers'

export function notationToOptions<Sides extends string | number>(
  notationString: Notation<Sides>
): RollOptions<Sides> {
  const coreNotationMatch = notationString.match(coreNotationPattern)!.at(0)
  const modifiersString = notationString.replace(coreNotationMatch!, '')

  return {
    ...parseCoreNotation(coreNotationMatch!),
    ...parseModifiers(modifiersString)
  } as RollOptions<Sides>
}

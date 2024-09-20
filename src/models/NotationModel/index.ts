import { coreNotationPattern } from '~patterns'
import { RandsumNotation, RandsumRollOptions } from '~types'
import { parseCoreNotation, parseModifiers } from './optionsParsers'

function toOptions(
  notationString: RandsumNotation
): RandsumRollOptions<number | string> {
  const coreNotationMatch = notationString.match(coreNotationPattern)!.at(0)
  const modifiersString = notationString.replace(coreNotationMatch!, '')

  return {
    ...parseCoreNotation(coreNotationMatch!),
    ...parseModifiers(modifiersString)
  }
}

export default { toOptions }

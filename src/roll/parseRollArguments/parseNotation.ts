import { coreNotationPattern } from '~matchPattern'
import { DiceNotation, DicePoolOptions } from '~types'
import { parseCoreNotation, parseModifiers } from './parseModifiers'

const parseNotation = (
  notationString: DiceNotation
): DicePoolOptions<number | string> => {
  const coreNotationMatch = notationString.match(coreNotationPattern)!.at(0)
  const modifiersString = notationString.replace(coreNotationMatch!, '')

  return {
    ...parseCoreNotation(coreNotationMatch!),
    ...parseModifiers(modifiersString)
  }
}

export default parseNotation

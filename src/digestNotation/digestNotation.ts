import { DiceNotation } from 'types'
import { digestCore } from './digestCore'
import { digestModifiers } from './digestModifiers'
import { diceNotationPattern } from './matchers'

export function digestNotation(notationString: DiceNotation) {
  if (notationString.includes(' ')) {
    throw 'Notation cannot include spaces.'
  }
  //Condifent this is a DiceNotation string, so this DiceNotation pattern would find something.
  const coreMatches = notationString.toLowerCase().match(diceNotationPattern) as RegExpMatchArray

  const coreNotation = coreMatches[0]
  const coreParams = digestCore(coreNotation)
  const modifierNotation = notationString.replace(coreNotation, '')

  return { ...coreParams, ...digestModifiers(modifierNotation, coreParams), notation: notationString }
}

import { digestCore } from './digestCore'
import { digestModifiers } from './digestModifiers'
import { diceNotationPattern } from './matchers'

export function digestNotation(notationString: string) {
  const coreMatches = notationString.toLowerCase().match(diceNotationPattern)

  if (!coreMatches) {
    throw `Dice Notation is not parseable. Received: ${notationString}`
  }

  const coreNotation = coreMatches[0]
  const coreParams = digestCore(coreNotation)
  const modifierNotation = notationString.replace(coreNotation, '')

  return { ...coreParams, ...digestModifiers(modifierNotation, coreParams) }
}

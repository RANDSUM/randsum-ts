import { digestCore } from './digestCore'
import { diceNotationPattern } from './matchers'

export function digestNotation(notationString: string) {
  const coreMatches = notationString.toLowerCase().match(diceNotationPattern)

  if (!coreMatches) {
    throw `Dice Notation is not parseable. Received: ${notationString}`
  }

  return { ...digestCore(coreMatches[0]) }
}

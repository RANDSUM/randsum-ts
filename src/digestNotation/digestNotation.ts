import { DiceNotation, RollParameters } from 'types'
import { digestModifiers } from './digestModifiers'

export function digestNotation(notationString: DiceNotation): RollParameters {
  if (notationString.includes(' ')) {
    throw 'Notation cannot include spaces.'
  }

  return { ...digestModifiers(notationString.toLowerCase()), notation: notationString }
}

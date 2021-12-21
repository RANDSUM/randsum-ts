import { digestNotation } from 'digestNotation'
import { randsum } from 'randsum'
import { RollParameters } from 'types'
import { isDiceNotation, isRollOptions } from 'utils'

type randsumArgs = Parameters<typeof randsum>
export function digestArgsIntoParameters(firstArg: randsumArgs[0]): RollParameters {
  if (isRollOptions(firstArg)) {
    return { rolls: firstArg?.rolls || 1, ...firstArg }
  }
  return isDiceNotation(firstArg) ? digestNotation(firstArg) : { rolls: 1, sides: Number(firstArg) }
}

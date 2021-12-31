import { RollParameters } from '../../../types'

export function parseCoreNotation(notationString: string): Pick<RollParameters, 'sides' | 'quantity'> {
  const [quantity, sides] = notationString.split('d').map((number: unknown) => Number(number))
  return { quantity, sides }
}

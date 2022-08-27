import { InternalRollParameters } from 'types'

export function parseCoreNotation(
  notationString: string
): Pick<InternalRollParameters, 'sides' | 'quantity' | 'faces'> {
  // const [quantity, sides] = notationString.split('d').map(Number)

  // return { quantity, sides }
  const [quantity, sides] = notationString.downcase().split('d')
  return {
    quantity: Number(quantity),
    sides: 1,
    faces: []
  }
}

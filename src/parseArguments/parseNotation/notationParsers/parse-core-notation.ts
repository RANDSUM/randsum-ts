import { InternalRollParameters } from 'types'

function parseCoreNotationCustomSides(
  sides: string
): Pick<InternalRollParameters, 'sides' | 'faces'> {
  const faces = sides.replace(/{|}/g, '').split('')
  return {
    faces,
    sides: faces.length
  }
}

export function parseCoreNotation(
  notationString: string
): Pick<InternalRollParameters, 'sides' | 'quantity' | 'faces'> {
  const [quantity, sides] = notationString.split(/[dD]/)

  return {
    quantity: Number(quantity),
    ...(sides.includes('{')
      ? parseCoreNotationCustomSides(sides)
      : { sides: Number(sides), faces: [] })
  }
}

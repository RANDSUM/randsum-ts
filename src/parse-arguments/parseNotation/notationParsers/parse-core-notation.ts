import { InternalRollParameters } from 'types'

function parseCoreNotationCustomSides(
  sides: string
): Pick<InternalRollParameters, 'sides' | 'faces'> {
  const faces = [...sides.replace(/{|}/g, '')]
  return {
    faces,
    sides: faces.length
  }
}

export default function parseCoreNotation(
  notationString: string
): Pick<InternalRollParameters, 'sides' | 'quantity' | 'faces'> {
  const [quantity, sides] = notationString.split(/[Dd]/)

  return {
    quantity: Number(quantity),
    ...(sides.includes('{')
      ? parseCoreNotationCustomSides(sides)
      : { sides: Number(sides), faces: undefined })
  }
}

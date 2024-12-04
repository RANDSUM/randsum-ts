import { isDiceNotation } from '~src/notation/guards'
import { DiceNotation } from '~src/notation/types'
import { argumentToRollConfig } from '~src/tower/utils/argumentToRollConfig'
import { customCoreNotationPattern } from '../patterns'
import type { CustomFacesDiceNotation, CustomFacesRollConfig } from '../types'
import { facesFromSides } from './facesFromSides'

export function customFacesNotationToCustomFacesRollConfig(
  notationString: CustomFacesDiceNotation | DiceNotation
): CustomFacesRollConfig {
  if (isDiceNotation(notationString)) {
    const { quantity, sides } = argumentToRollConfig(notationString)
    return {
      quantity,
      sides,
      faces: facesFromSides(sides)
    }
  }

  const customCoreNotationMatch = notationString
    .match(customCoreNotationPattern)!
    .at(0)!

  const [quantity, rawFaces] = customCoreNotationMatch.split(/[Dd]/)
  const faces = rawFaces.replace('{', '').replace('}', '').split('')

  return {
    quantity: Number(quantity),
    sides: Number(faces.length),
    faces
  }
}

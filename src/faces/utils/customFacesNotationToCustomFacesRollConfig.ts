import { DiceNotation } from '~src/types'
import { isDiceNotation } from '~notation'

import { argumentToRollConfig } from '~src/utils/argumentToRollConfig'
import { customCoreNotationPattern } from '../patterns'
import { facesFromSides } from './facesFromSides'

import { CustomFacesDiceNotation, CustomFacesRollConfig } from '../types'

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

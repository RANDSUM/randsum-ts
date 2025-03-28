import { coreRandom } from './coreRandom'
import { generateNumericalFaces } from './generateNumericalFaces'

export function coreSpreadRolls<F extends string | number>(
  quantity: number,
  max: number,
  faces?: F[]
): F[] {
  const facesArr = faces ?? generateNumericalFaces(max)
  return Array.from({ length: quantity }, () => coreRandom(max)).map((roll) => {
    return facesArr[roll]
  }) as F[]
}

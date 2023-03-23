import { CustomSides, NumberString } from '../types/primitives'
import CustomSidesDie from './custom-sides-die'
import StandardDie from './standard-die'

const isCustomSides = (
  sides: NumberString | CustomSides
): sides is CustomSides => Array.isArray(sides)

function makeDie(sides: NumberString): StandardDie
function makeDie(sides: CustomSides): CustomSidesDie
function makeDie<T extends NumberString | CustomSides>(
  sides: T
): T extends CustomSides ? CustomSidesDie : StandardDie
function makeDie(
  sides: NumberString | CustomSides
): StandardDie | CustomSidesDie {
  if (isCustomSides(sides)) {
    return new CustomSidesDie(sides)
  }
  return new StandardDie(sides)
}

export { makeDie }

export { default as CustomSidesDie } from './custom-sides-die'
export { default as StandardDie } from './standard-die'

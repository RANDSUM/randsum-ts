import { CustomSides } from '../types'
import CustomSidesDie from './custom-sides-die'
import StandardDie from './standard-die'

function makeDie(sides: number): StandardDie
function makeDie(sides: CustomSides): CustomSidesDie
function makeDie(sides: number | CustomSides): StandardDie | CustomSidesDie {
  return Array.isArray(sides)
    ? new CustomSidesDie(sides)
    : new StandardDie(sides)
}

export { makeDie }
export { default as CustomSidesDie } from './custom-sides-die'
export { default as StandardDie } from './standard-die'

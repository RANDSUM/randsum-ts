import { CustomSides } from '../types/options'
import { CustomSidesDie, StandardDie } from './constants'
import { isCustomSides } from './guards'
import SingleDie from './single-die'

function dieFactory(sides: number): SingleDie<number>
function dieFactory(sides: CustomSides): SingleDie<string>
function dieFactory<D extends string | number>(
  sides: D extends number ? number : CustomSides
): D extends number ? SingleDie<number> : SingleDie<string>
function dieFactory(
  sides: number | CustomSides
): SingleDie<string> | SingleDie<number> {
  return isCustomSides(sides)
    ? new CustomSidesDie(sides.map(String))
    : new StandardDie(sides)
}

// eslint-disable-next-line import/prefer-default-export
export { dieFactory }

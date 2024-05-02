import { CustomSidesDie, StandardDie } from './constants'
import SingleDie from './single-die'

type CustomSides = (string | number)[]
function dieFactory(sides: number): SingleDie<number>
function dieFactory(sides: CustomSides): SingleDie<string>
function dieFactory<D extends string | number>(
  sides: D extends number ? number : CustomSides
): D extends number ? SingleDie<number> : SingleDie<string>
function dieFactory(
  sides: number | CustomSides
): SingleDie<string> | SingleDie<number> {
  return Array.isArray(sides)
    ? new CustomSidesDie(sides.map(String))
    : new StandardDie(sides)
}

export default dieFactory

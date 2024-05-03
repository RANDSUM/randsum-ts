import { CustomSidesDie, StandardDie } from './constants'
import SingleDie from './single-die'

function dieFactory(sides: number): SingleDie<number>
function dieFactory(sides: (string | number)[]): SingleDie<string>
function dieFactory<D extends string | number>(
  sides: D extends number ? number : (string | number)[]
): D extends number ? SingleDie<number> : SingleDie<string>
function dieFactory(
  sides: number | (string | number)[]
): SingleDie<string> | SingleDie<number> {
  return Array.isArray(sides)
    ? new CustomSidesDie(sides.map(String))
    : new StandardDie(sides)
}

export default dieFactory

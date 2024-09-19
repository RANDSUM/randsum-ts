import { CustomSidesDie, StandardDie } from './constants'
import { SingleDie } from './single-die'

function dieFactory(sides: number): SingleDie<number>
function dieFactory(sides: string[]): SingleDie<string>
function dieFactory<D extends string | number>(
  sides: D extends number ? number : string[]
): SingleDie<D>
function dieFactory(sides: number | string[]): SingleDie {
  return Array.isArray(sides)
    ? new CustomSidesDie(sides.map(String))
    : new StandardDie(Number(sides))
}

export { dieFactory }

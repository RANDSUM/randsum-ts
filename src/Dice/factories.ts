import { CustomSidesDie, StandardDie } from './constants'
import { Die } from './die'

function dieFactory(sides: number): Die<number>
function dieFactory(sides: string[]): Die<string>
function dieFactory<D extends string | number>(
  sides: D extends number ? number : string[]
): Die<D>
function dieFactory(sides: number | string[]): Die {
  return Array.isArray(sides)
    ? new CustomSidesDie(sides.map(String))
    : new StandardDie(Number(sides))
}

export { dieFactory }

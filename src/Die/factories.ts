import { CustomSides, DiceOptions } from '../types/options'
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

function dicePoolFactory(options: DiceOptions<number>[]): StandardDie[]
function dicePoolFactory(options: DiceOptions<string>[]): CustomSidesDie[]
function dicePoolFactory(
  options: (DiceOptions<number> | DiceOptions<string>)[]
): (StandardDie | CustomSidesDie)[]
function dicePoolFactory(
  options: DiceOptions<string | number>[]
): (StandardDie | CustomSidesDie)[] | StandardDie[] | CustomSidesDie[] {
  return options.flatMap((die) => {
    const quantity = Number(die.quantity || 1)
    return [...Array(quantity).keys()].map(() => dieFactory(die.sides))
  })
}

export { dicePoolFactory, dieFactory }

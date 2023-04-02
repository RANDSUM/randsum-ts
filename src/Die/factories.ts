import { CustomSides, DiceOptions } from '../types/options'
import { NumberString } from '../types/primitives'
import { CustomSidesDie, StandardDie } from './constants'
import { isCustomSidesOptions } from './guards'
import SingleDie from './single-die'

function dieFactory(sides: NumberString): SingleDie<number>
function dieFactory(sides: CustomSides): SingleDie<string>
function dieFactory<D extends string | number>(
  sides: D extends number ? NumberString : CustomSides
): D extends number ? SingleDie<number> : SingleDie<string>
function dieFactory(
  sides: NumberString | CustomSides
): SingleDie<string> | SingleDie<number> {
  return isCustomSidesOptions(sides)
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

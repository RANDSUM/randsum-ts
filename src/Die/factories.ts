import { DiceOptions } from '../types/options'
import { DieSides, NumberString } from '../types/primitives'
import { CustomSidesDie, StandardDie } from './constants'
import { isCustomSides } from './guards'
import SingleDie from './single-die'

function dieFactory(sides: NumberString): SingleDie<number>
function dieFactory(sides: (number | string)[]): SingleDie<string>
function dieFactory<T extends DieSides>(
  sides: T extends number ? NumberString : (number | string)[]
): SingleDie<T>
function dieFactory(
  sides: NumberString | (number | string)[]
): SingleDie<string> | SingleDie<number> {
  return isCustomSides(sides)
    ? new CustomSidesDie(sides.map(String))
    : new StandardDie(sides)
}

function dicePoolFactory(options: DiceOptions<number>[]): StandardDie[]
function dicePoolFactory(options: DiceOptions<string>[]): CustomSidesDie[]
function dicePoolFactory<T extends DieSides>(
  options: DiceOptions<T>[]
): T extends number ? StandardDie[] : CustomSidesDie[]
function dicePoolFactory(
  options: DiceOptions<number>[] | DiceOptions<string>[]
): StandardDie[] | CustomSidesDie[] {
  return options.flatMap((die) => {
    const quantity = Number(die.quantity || 1)

    return [...Array(quantity).keys()].map(() => dieFactory(die.sides))
  }) as StandardDie[] | CustomSidesDie[]
}

export { dicePoolFactory, dieFactory }

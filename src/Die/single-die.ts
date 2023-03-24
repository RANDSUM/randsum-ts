import { DiceOptions } from '../types/options'
import { DieSides, NumberString } from '../types/primitives'
import { generateStandardSides } from '../utils'

const isCustomSides = (sides: unknown): sides is (number | string)[] =>
  Array.isArray(sides)

abstract class SingleDie<T extends DieSides> {
  sides: number

  faces: T[]

  constructor(sides: T extends number ? NumberString : (string | number)[]) {
    const isCustom = isCustomSides(sides)
    this.sides = isCustom ? sides.length : Number(sides)
    this.faces = (isCustom ? sides : generateStandardSides(sides)) as T[]
  }

  roll(): T {
    return this.faces[this.rawRoll()]
  }

  protected rawRoll(): number {
    return Math.floor(Math.random() * Number(this.sides))
  }
}

export class StandardDie extends SingleDie<number> {}
export class CustomSidesDie extends SingleDie<string> {}

function dieFactory(sides: NumberString): SingleDie<number>
function dieFactory(sides: (number | string)[]): SingleDie<string>
function dieFactory<T extends DieSides>(
  sides: T extends number ? NumberString : (number | string)[]
): T extends number ? SingleDie<string> : SingleDie<number>
function dieFactory(
  sides: NumberString | (number | string)[]
): SingleDie<string> | SingleDie<number> {
  return isCustomSides(sides)
    ? new CustomSidesDie(sides.map(String))
    : new StandardDie(sides)
}

function dicePoolFactory(options: DiceOptions[]): StandardDie[]
function dicePoolFactory(options: DiceOptions<string>[]): CustomSidesDie[]
function dicePoolFactory<T extends DieSides>(
  options: T extends number ? DiceOptions[] : DiceOptions<string>[]
): T extends number ? StandardDie[] : CustomSidesDie[]
function dicePoolFactory(
  options: DiceOptions[] | DiceOptions<string>[]
): StandardDie[] | CustomSidesDie[] {
  return options.flatMap((die) => {
    const quantity = Number(die.quantity || 1)

    return [...Array(quantity).keys()].map(() => dieFactory(die.sides))
  }) as StandardDie[] | CustomSidesDie[]
}

export { dicePoolFactory, dieFactory }

export default SingleDie

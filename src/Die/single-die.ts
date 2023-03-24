import { DieSides, NumberString } from '../types/primitives'

const isCustomSides = (sides: unknown): sides is (number | string)[] =>
  Array.isArray(sides)

abstract class SingleDie<T extends DieSides> {
  sides: number

  faces: T[]

  custom: T extends number ? false : true

  constructor(sides: T extends number ? NumberString : T[]) {
    if (isCustomSides(sides)) {
      this.custom = true as T extends number ? false : true
      this.sides = sides.length
      this.faces = sides as T[]
    } else {
      this.custom = false as T extends number ? false : true
      this.sides = Number(sides)
      this.faces = [...Array.from({ length: this.sides }).keys()].map(
        (i) => i + 1
      ) as T[]
    }
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
  if (isCustomSides(sides)) {
    return new CustomSidesDie(sides.map(String))
  }
  return new StandardDie(sides)
}

export { dieFactory }

export default SingleDie

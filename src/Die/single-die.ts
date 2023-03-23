import { CustomSides, DieType, NumberString } from '../types/primitives'

abstract class SingleDie<T extends DieType = never> {
  sides: number

  faces: T extends 'standard' ? number[] : CustomSides

  custom: T extends 'standard' ? false : true

  constructor(sides: T extends 'standard' ? NumberString : CustomSides) {
    if (Array.isArray(sides)) {
      this.custom = true as T extends 'standard' ? false : true
      this.sides = sides.length
      this.faces = sides
    } else {
      this.custom = false as T extends 'standard' ? false : true
      this.sides = Number(sides)
      this.faces = [...Array.from({ length: this.sides }).keys()].map(
        (i) => i + 1
      )
    }
  }

  roll(): T extends 'standard' ? number : number | string {
    return this.faces[this.rawRoll()] as T extends 'standard'
      ? number
      : number | string
  }

  protected rawRoll(): number {
    return Math.floor(Math.random() * Number(this.sides))
  }
}

export class StandardDie extends SingleDie<'standard'> {}
export class CustomSidesDie extends SingleDie<'customSides'> {}

const isCustomSides = (
  sides: NumberString | CustomSides
): sides is CustomSides => Array.isArray(sides)

function dieFactory(sides: NumberString): SingleDie<'standard'>
function dieFactory(sides: CustomSides): SingleDie<'customSides'>
function dieFactory<T extends DieType>(
  sides: T extends 'standard' ? NumberString : CustomSides
): T extends 'standard' ? SingleDie<'customSides'> : SingleDie<'standard'>
function dieFactory(
  sides: NumberString | CustomSides
): SingleDie<'customSides'> | SingleDie<'standard'> {
  if (isCustomSides(sides)) {
    return new CustomSidesDie(sides)
  }
  return new StandardDie(sides)
}

export { dieFactory }

export default SingleDie

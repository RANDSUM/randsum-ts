import { CustomSidesOption } from '../types/options'
import { DieSides, NumberString } from '../types/primitives'
import { isCustomSidesOptions } from './guards'

const generateStandardSides = (sides: NumberString): number[] =>
  Array.from({ length: Number(sides) }, (_, index) => index + 1)

export default abstract class SingleDie<D extends DieSides> {
  sides: number

  faces: D[]

  constructor(sides: D extends number ? NumberString : CustomSidesOption) {
    const isCustom = isCustomSidesOptions(sides)
    this.sides = isCustom ? sides.length : Number(sides)
    this.faces = (isCustom ? sides : generateStandardSides(sides)) as D[]
  }

  roll(): D {
    return this.faces[this.rawRoll()]
  }

  protected rawRoll(): number {
    return Math.floor(Math.random() * Number(this.sides))
  }
}

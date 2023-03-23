import { CustomSides, NumberString } from '../types/primitives'

export default abstract class Die<
  T extends NumberString<'inclusive'> | CustomSides
> {
  sides: number

  faces: unknown[]

  constructor(sides: T) {
    this.sides = Array.isArray(sides) ? sides.length : Number(sides)
    this.faces = []
  }

  roll(): unknown {
    return this.faces[this.rawRoll()]
  }

  protected rawRoll(): number {
    return Math.floor(Math.random() * Number(this.sides))
  }
}

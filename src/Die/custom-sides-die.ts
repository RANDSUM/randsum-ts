import { CustomSides } from '../types/primitives'
import Die from './die'

export default class CustomSidesDie extends Die<CustomSides> {
  faces: CustomSides

  constructor(sides: CustomSides) {
    super(sides)
    this.faces = sides
  }

  roll(): string | number {
    return this.faces[this.rawRoll()]
  }
}

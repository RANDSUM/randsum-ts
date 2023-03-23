import { NumberString } from '../types/primitives'
import { generateNumFaces } from '../utils'
import Die from './die'

export default class StandardDie extends Die<NumberString> {
  faces: number[]

  constructor(sides: NumberString) {
    super(sides)
    this.faces = generateNumFaces(Number(sides))
  }

  roll(): number {
    return this.faces[this.rawRoll()]
  }
}

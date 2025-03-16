import type { Die } from '~types'
import { coreSpreadRolls } from '~utils/coreSpreadRolls'
import { generateNumericalFaces } from '~utils/generateNumericalFaces'

export class NumDie implements Die<number> {
  sides: number
  faces: number[]
  type: 'numerical'

  constructor(sides: number) {
    this.sides = sides
    this.type = 'numerical'
    this.faces = generateNumericalFaces(sides)
  }

  roll(quantity = 1): number {
    return this.rollSpread(quantity).reduce<number>(
      (acc, roll) => acc + roll,
      0
    )
  }

  rollSpread(quantity = 1): number[] {
    return coreSpreadRolls(quantity, this.sides, this.faces)
  }

  get toOptions() {
    return {
      quantity: 1,
      sides: this.sides satisfies number as number
    }
  }

  get isCustom() {
    return false
  }
}

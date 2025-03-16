import type { Die } from '~types'
import { coreSpreadRolls } from '~utils/coreSpreadRolls'

export class CustomDie implements Die<string[]> {
  sides: number
  faces: string[]
  type: 'custom'

  constructor(sides: string[]) {
    this.sides = sides.length
    this.type = 'custom'
    this.faces = sides
  }

  roll(quantity = 1): string {
    return this.rollSpread(quantity).join(', ')
  }

  rollSpread(quantity = 1): string[] {
    return coreSpreadRolls(quantity, this.sides, this.faces)
  }

  get toOptions() {
    return {
      quantity: 1,
      sides: this.faces satisfies string[] as string[]
    }
  }

  get isCustom() {
    return false
  }
}

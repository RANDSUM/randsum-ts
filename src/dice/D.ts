import { RollConfig } from '~src/types'
import { coreRandom } from '~src/utils/coreRandom'

export class D {
  public sides: number

  constructor(sides: number) {
    this.sides = sides
  }

  toRollConfig(): RollConfig {
    return {
      sides: this.sides,
      quantity: 1
    }
  }

  roll(): number {
    return coreRandom(this.sides)
  }

  rollMany(quantity: number): number[] {
    return Array.from({ length: quantity }, () => this.roll())
  }
}

import { Die } from '~src/types'
import { coreRandom } from '~src/utils/coreRandom'

export class D implements Die {
  public sides: number

  constructor(sides: number) {
    this.sides = sides
  }

  roll(quantity = 1): number {
    return this.rollSpread(quantity).reduce((acc, curr) => acc + curr, 0)
  }

  rollSpread(quantity: number): number[] {
    return Array.from({ length: quantity }, () => this.rollSingle())
  }

  protected rollSingle(): number {
    return coreRandom(this.sides)
  }
}

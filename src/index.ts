import { RollLog } from './rollLog'
import { RollModifier } from './types'
import { generateTotal, random } from './utils'

// tslint:disable-next-line: class-name
export class D {
  public readonly sides: number
  public readonly log: RollLog[] = []

  constructor(sides: number) {
    this.sides = sides
  }

  public roll = (num = 1, modifier?: RollModifier) => {
    const results = Array.from(Array(num)).map(this.singleRoll)
    const total = generateTotal(results, modifier)
    this.log.push(new RollLog(total, results, modifier))

    return total
  }

  private singleRoll = () => {
    return random(this.sides)
  }
}

export const [D4, D6, D8, D10, D12, D20, D100] = [4, 6, 8, 10, 12, 20, 100].map(
  sides => new D(sides),
)

import { RollLog } from '.'
import { RollModifier } from './types'
import { generateTotal, random } from './utils'

// tslint:disable-next-line: class-name
export class D {
  public readonly sides: number
  public readonly log: RollLog[] = []

  constructor(sides: number) {
    this.sides = sides
  }

  public roll(num = 1, modifier?: RollModifier) {
    const results = Array(num).map(() => this.singleRoll)
    const total = generateTotal(results, modifier)
    this.log.push(new RollLog(total, results, modifier))

    return total
  }

  private get singleRoll() {
    return random(this.sides)
  }
}

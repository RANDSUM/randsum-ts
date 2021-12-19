import { RollLog } from 'rollLog'
import { RollModifier, RollResult } from 'types'
import { generateTotal, randomNumber } from 'utils'

export * from 'utils'
export * from 'types'

export class Die {
  public readonly sides: number
  public readonly log: RollLog[] = []
  public readonly persist: boolean

  constructor(sides: number, persist = false) {
    this.sides = sides
    this.persist = persist
  }

  public roll = (num = 1, modifier?: RollModifier): RollResult => {
    const rolls = Array.from(Array(num)).map(this.singleRoll)
    const total = generateTotal(rolls, modifier)

    this.persist && this.log.push(new RollLog(total, rolls, modifier))

    return { total, rolls, modifier }
  }

  singleRoll = () => {
    return randomNumber(this.sides)
  }
}

export const [D4, D6, D8, D10, D12, D20, D100] = [4, 6, 8, 10, 12, 20, 100].map(
  sides => new Die(sides),
)

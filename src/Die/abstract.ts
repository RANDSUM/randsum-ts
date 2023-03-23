import { DieType, RollOptions } from '../types'

export default abstract class Die<T extends DieType> {
  sides: RollOptions<T>['sides']

  constructor(sides: RollOptions<T>['sides']) {
    this.sides = sides
  }

  protected rawRoll(): number {
    const sidesCount = Array.isArray(this.sides)
      ? this.sides.length
      : this.sides
    return Math.floor(Math.random() * Number(sidesCount)) + 1
  }
}

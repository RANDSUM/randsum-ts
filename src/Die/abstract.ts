import { DieType, RollOptions } from '../types'

export default abstract class Die<T extends DieType> {
  sides: RollOptions<T>['sides']

  constructor(sides: RollOptions<T>['sides']) {
    this.sides = sides
  }
}

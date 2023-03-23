import { CustomSidesDie, StandardDie } from '.'

export default class DicePool {
  dice: StandardDie[] | CustomSidesDie[]

  constructor(dice: StandardDie[] | CustomSidesDie[]) {
    this.dice = dice
  }

  roll(): number[] | (string | number)[] {
    return this.dice.map((die) => die.roll())
  }
}

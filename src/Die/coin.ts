import { SingleDie } from './single-die'

class Coin extends SingleDie<string> {
  constructor(sides: [string, string] = ['heads', 'tails']) {
    super(sides)
  }

  flip(): string {
    return super.roll()
  }

  roll(): string {
    console.warn(
      "You roll the coin and it falls off the table and onto the ground. Maybe you'll try `.flip()`ping it instead?"
    )
    return super.roll()
  }
}

export { Coin }

import SingleDie from './single-die'

export default class Coin extends SingleDie<string> {
  constructor(sides: [string, string] = ['heads', 'tails']) {
    super(sides)
  }

  flip(): string {
    return super.roll()
  }

  roll(): string {
    // eslint-disable-next-line no-console
    console.warn(
      "You roll the coin and it falls off the table and onto the ground. Maybe you'll try `.flip()`ping it instead?"
    )
    return super.roll()
  }
}

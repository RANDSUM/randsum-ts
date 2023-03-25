import SingleDie from './single-die'

export default class Coin extends SingleDie<'heads' | 'tails'> {
  constructor(
    sides: ['heads' | 'tails', 'heads' | 'tails'] = ['heads', 'tails']
  ) {
    super(sides)
  }

  flip(): 'heads' | 'tails' {
    return super.roll()
  }

  roll(): 'heads' | 'tails' {
    // eslint-disable-next-line no-console
    console.warn(
      "You roll the coin and it falls off the table and onto the ground. Maybe you'll try `.flip()`ping it instead?"
    )
    return super.roll()
  }
}

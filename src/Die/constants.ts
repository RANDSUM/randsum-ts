import SingleDie from './single-die'

export class StandardDie extends SingleDie<number> {}
export class CustomSidesDie extends SingleDie<string> {}

export class Coin extends SingleDie<string> {
  constructor(
    sides: ['heads' | 'tails', 'heads' | 'tails'] = ['heads', 'tails']
  ) {
    super(sides)
  }

  flip(): 'heads' | 'tails' {
    return super.roll() as 'heads' | 'tails'
  }

  roll(): 'heads' | 'tails' {
    // eslint-disable-next-line no-console
    console.warn(
      "You roll the coin and it falls off the table and onto the ground. Maybe you'll try `.flip()`ping it instead?"
    )
    return this.flip()
  }
}

export const D4 = new StandardDie(4)
export const D6 = new StandardDie(6)
export const D8 = new StandardDie(8)
export const D10 = new StandardDie(10)
export const D12 = new StandardDie(12)
export const D20 = new StandardDie(20)
export const D100 = new StandardDie(100)

export const FairCoin = new Coin()
export const TwoHeadedCoin = new Coin(['heads', 'heads'])

import { Coin } from '..'

describe(Coin, () => {
  const sides: [string, string] = ['Chansey', 'Pokeball']
  const coin = new Coin(sides)

  beforeEach(() => {
    // eslint-disable-next-line prettier/prettier
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  test('.flip() returns a string included in the contructor', () => {
    expect(sides).toContain(coin.flip())
  })

  test('.roll() returns a string included in the constructor', () => {
    expect(sides).toContain(coin.roll())
  })
})

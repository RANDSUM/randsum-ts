import { describe, expect, test } from 'bun:test'

import { Coin } from '~Die'

describe('Coin', () => {
  const sides: [string, string] = ['Chansey', 'Pokeball']
  const coin = new Coin(sides)
  test('.flip() returns a string included in the contructor', () => {
    expect(sides).toContain(coin.flip())
  })

  test('.roll() returns a string included in the constructor', () => {
    expect(sides).toContain(coin.roll())
  })
})

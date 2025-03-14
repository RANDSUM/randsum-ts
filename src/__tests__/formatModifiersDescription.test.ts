import { describe, expect } from 'bun:test'
import { formatModifierDescriptions } from '~src/descriptionFormatters/formatModifierDescription'

describe('formatModifierDescription', () => {
  describe('given a max reroll set of reroll options', () => {
    const description = formatModifierDescriptions({
      sides: 20,
      quantity: 20,
      modifiers: {
        reroll: { greaterThan: 5, lessThan: 15, maxReroll: 2, exact: [1] }
      }
    })

    expect(description).toEqual([
      'Reroll [1], greater than [5] and less than [15] (up to 2 times)'
    ])
  })
})

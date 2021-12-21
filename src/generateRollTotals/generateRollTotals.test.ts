import { RollParameters } from '../types'
import { generateRollTotals } from './generateRollTotals'

let mockRollerCount = 0
const mockRollerTotals = [2, 3, 6, 3, 6, 3, 2, 5, 1, 4, 2, 1]
const mockRoller = () => {
  const result = mockRollerTotals[mockRollerCount]
  mockRollerCount === mockRollerTotals.length - 1 ? (mockRollerCount = 0) : mockRollerCount++

  return result
}

const mockGenerateRollTotals = (modifier: RollParameters) => generateRollTotals(modifier, mockRoller)

describe('generateRollTotals', () => {
  beforeEach(() => {
    mockRollerCount = 0
  })

  const baseModifiers = { sides: 6, rolls: 5 }

  describe('with no extra modifiers', () => {
    const rollTotals = mockGenerateRollTotals(baseModifiers)

    test('it produces an array of numbers equal to the modifier rolls, all between 1 and the number of sides', () => {
      expect(rollTotals).toEqual(expect.arrayContaining([6, 3, 6, 3, 2]))
    })
  })
})

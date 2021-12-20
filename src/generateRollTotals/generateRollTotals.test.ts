
import { RollParameters } from '../types'
import {generateRollTotals} from './generateRollTotals'

let mockRollerCount = 0
const mockRollerTotals = [2, 3, 6, 3, 6, 3, 2, 5, 1, 4, 2, 1]
const mockRoller = (_sides: number) => {
  const result = mockRollerTotals[mockRollerCount]
  mockRollerCount === (mockRollerTotals.length - 1) ? mockRollerCount = 0 : mockRollerCount++

  return result
}

const mockGenerateRollTotals = (modifier: RollParameters) => generateRollTotals(modifier, mockRoller)

describe('generateRollTotals', () => {
  beforeEach(() => {
    mockRollerCount = 0
  })
  const baseModifiers = {sides: 6, rolls: 5}

  describe('with no extra modifiers', () => {
    const rollTotals = mockGenerateRollTotals(baseModifiers)

    test('it produces an array of numbers equal to the modifier rolls, all between 1 and the number of sides', () => {
      expect(rollTotals).toEqual(expect.arrayContaining([6,3,6,3,2]))
    })

  })

  describe('with the unique modifier', () => {
    const uniqueModifiers = {...baseModifiers, unique: true }
    const rollTotals = mockGenerateRollTotals(uniqueModifiers)

    test('it produces an array of numbers equal to the modifier rolls, all between 1 and the number of sides, with no duplicates', () => {
      expect(rollTotals).toEqual(expect.arrayContaining([3,2,5,1,4]))
    })

    describe('and numbers passed in with the notUnique modifier', () => {
      const uniqueNotUniqueModifiers = {...baseModifiers, unique: true, notUnique: [3]}
      const rollTotals = mockGenerateRollTotals(uniqueNotUniqueModifiers)

      test('it produces an array of numbers equal to the modifier rolls, all between 1 and the number of sides, with no duplicates except for those in the notUnique array', () => {
        expect(rollTotals).toEqual(expect.arrayContaining([2,1,3,6,3]))
      })
    })
  })
})

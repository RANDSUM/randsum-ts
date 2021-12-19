import { Die } from '.'
import { RollModifier } from './types'

const RollCoreTests = ({
  n,
  rollModifier,
  persist,
}: { n?: number; rollModifier?: RollModifier; persist?: boolean } = {}) => {
  const D6 = new Die(6, persist)
  const initialLogLength = D6.log.length
  const { total, rolls, modifier } = D6.roll(n, rollModifier)
  const latestRollLog = D6.log[0]

  test('returns a number as total', () => {
    expect(Number.isInteger(total)).toBe(true)
  })

  test('returns an array of results as rolls', () => {
    rolls.forEach(result => {
      expect(Number.isInteger(result)).toBe(true)
    })
  })

  test('returns any passed in modifier as modifier', () => {
    expect(modifier).toEqual(rollModifier)
  })

  if (persist) {
    test('adds a log of the roll', () => {
      expect(D6.log.length - initialLogLength).toEqual(1)
    })

    test('logs a results array equal in length to the number of die rolled', () => {
      expect(latestRollLog.results.length).toEqual(n || 1)
    })

    test('logs the total', () => {
      expect(latestRollLog.total).toEqual(total)
    })

    test('logs the date time of the roll', () => {
      expect(latestRollLog.dateRolled).toBeInstanceOf(Date)
    })

    if (rollModifier) {
      test('logs the modifier used in the total calculation', () => {
        expect(latestRollLog.modifier).toEqual(rollModifier)
      })
    }
  } else {
    test('does not add a log of the roll', () => {
      expect(D6.log.length - initialLogLength).toEqual(0)
    })
  }
}

describe('D methods:', () => {
  describe('#roll', () => {
    describe('persist logging', () => {
      RollCoreTests({ persist: true })
    })
    describe('(n)', () => {
      describe('with a modifier object', () => {
        RollCoreTests({ n: 3, rollModifier: { drop: { highest: true } } })
      })
      describe('with a modifier function', () => {
        RollCoreTests({ n: 3, rollModifier: () => 4 })
      })
      describe('without a modifier', () => {
        RollCoreTests({ n: 3 })
      })
    })
    describe('()', () => {
      RollCoreTests()
    })
  })
})

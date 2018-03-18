import d from './index';
import { RollModifier } from './rollModifiers';

describe('D objects', () => {
  test('can be created when provided a side', () => {
    expect(new d(6)).not.toThrowError
  });
})

const RollCoreTests = ({n, modifier} : {n?: number, modifier?: RollModifier} = {}) => {
  const D6 = new d(6);
  const initialLogLength = D6.log.length;
  let total: number;
  if (n && modifier) {
    total = D6.roll(n, modifier);
  } else if (n) {
    total = D6.roll(n);
  } else {
    total = D6.roll()
  }
  const latestRollLog = D6.log[0];

  test('returns a number', () => {
    expect(Number.isInteger(total)).toBe(true);
  });

  test('adds a log of the roll', () => {
    expect(D6.log.length - initialLogLength).toEqual(1);
  });

  test('logs a results array equal in length to the number of die rolled', () => {
    expect(latestRollLog.results.length).toEqual(n || 1);
  });

  test('logs the total', () => {
    expect(latestRollLog.total).toEqual(total);
  });

  test('logs the date time of the roll', () => {
    expect(latestRollLog.dateRolled).toBeInstanceOf(Date)
  });

  if (modifier) {
    test('logs the modifier used in the total calculation', () => {
      expect(latestRollLog.modifier).toEqual(modifier);
    });
  }
}

describe('D methods:', () => {
  describe('#roll', () => {
    describe('(n)', () => {
      describe('with a modifier', () => {
        RollCoreTests({n: 3, modifier: () => 4});
      });
      describe('without a modifier', () => {
        RollCoreTests({n: 3});
      });

    });
    describe('()', () => {
      RollCoreTests()
    });
  });
});

import ParameterDigester from './index';

const RESULTS = [1, 2, 3];

describe('Parameter Digester,', () => {
  describe('when provided a modifier object', () => {
    test('with a plus property adds the provided amount', () => {
      const modifier = { plus: 2 };
      expect(ParameterDigester(RESULTS, modifier)).toEqual(8);
    });
    describe('with a minus property', () => {
      test('that is positive, subtracts that amount', () => {
        const modifier = { minus: 2 };
        expect(ParameterDigester(RESULTS, modifier)).toEqual(4);
      })
      test('that is negative, subtracts the absolute value', () => {
        const modifier = { minus: -2 };
        expect(ParameterDigester(RESULTS, modifier)).toEqual(4);
      })
    });
  });
  test('when provided a modifier function, returns the return value of the modifier', () => {
    const modifier = (results: number[]) => results.length;
    expect(ParameterDigester(RESULTS, modifier)).toBe(3);
  })
});3
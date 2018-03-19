import * as ex from './index';
import d  from './d';
import { D4, D6, D8, D10, D12, D20, D100 } from './constants';
import { RollAccessor, RollParameters, RollModifier } from './types';
import rollLog from './rollLog';

describe('Index Exports', () => {
  test('include d as named export', () => {
    expect(ex.d).toEqual(d);
  });
  test('includes rollLog as named export', () => {
    expect(ex.rollLog).toEqual(rollLog);
  })
  test('include premade Dice Constants as named exports', () => {
    expect(ex.D4).toEqual(D4);
    expect(ex.D6).toEqual(D6);
    expect(ex.D8).toEqual(D8);
    expect(ex.D10).toEqual(D10);
    expect(ex.D12).toEqual(D12);
    expect(ex.D20).toEqual(D20);
    expect(ex.D100).toEqual(D100);
  });
});

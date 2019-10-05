import * as ex from './index'

describe('Index Exports', () => {
  test('include D as named export', () => {
    expect(ex.D).toEqual(ex.D)
  })
  test('includes rollLog as named export', () => {
    expect(ex.RollLog).toEqual(ex.RollLog)
  })
})

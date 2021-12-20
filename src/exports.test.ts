import * as ex from '.'

describe('Index Exports', () => {
  test('include randsum as named export', () => {
    expect(ex.randsum).toEqual(ex.randsum)
  })

  describe('Constants', () => {
    it('returns a D4', () => {
      expect(ex.D4).not.toBeUndefined()
    })

    it('returns a D6', () => {
      expect(ex.D6).not.toBeUndefined()
    })

    it('returns a D8', () => {
      expect(ex.D8).not.toBeUndefined()
    })

    it('returns a D10', () => {
      expect(ex.D10).not.toBeUndefined()
    })

    it('returns a D12', () => {
      expect(ex.D12).not.toBeUndefined()
    })

    it('returns a D20', () => {
      expect(ex.D20).not.toBeUndefined()
    })

    it('returns a D100', () => {
      expect(ex.D100).not.toBeUndefined()
    })
  })
})

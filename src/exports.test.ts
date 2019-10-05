import * as ex from './index'

describe('Index Exports', () => {
  test('include D as named export', () => {
    expect(ex.D).toEqual(ex.D)
  })

  describe('Constants', () => {
    it('returns a D with four sides (D4)', () => {
      expect(ex.D4).toBeInstanceOf(ex.D)
      expect(ex.D4.sides).toEqual(4)
    })

    it('returns a D with six sides (D6)', () => {
      expect(ex.D6).toBeInstanceOf(ex.D)
      expect(ex.D6.sides).toEqual(6)
    })

    it('returns a D with eight sides (D8)', () => {
      expect(ex.D8).toBeInstanceOf(ex.D)
      expect(ex.D8.sides).toEqual(8)
    })

    it('returns a D with ten sides (D10)', () => {
      expect(ex.D10).toBeInstanceOf(ex.D)
      expect(ex.D10.sides).toEqual(10)
    })

    it('returns a D with twelve sides (D12)', () => {
      expect(ex.D12).toBeInstanceOf(ex.D)
      expect(ex.D12.sides).toEqual(12)
    })

    it('returns a D with twelve sides (D20)', () => {
      expect(ex.D20).toBeInstanceOf(ex.D)
      expect(ex.D20.sides).toEqual(20)
    })

    it('returns a D with twelve sides (D100)', () => {
      expect(ex.D100).toBeInstanceOf(ex.D)
      expect(ex.D100.sides).toEqual(100)
    })
  })
})

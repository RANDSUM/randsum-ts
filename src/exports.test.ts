import * as ex from '.'

describe('Index Exports', () => {
  test('include Die as named export', () => {
    expect(ex.Die).toEqual(ex.Die)
  })

  describe('Constants', () => {
    it('returns a D with four sides (D4)', () => {
      expect(ex.D4).toBeInstanceOf(ex.Die)
      expect(ex.D4.sides).toEqual(4)
    })

    it('returns a D with six sides (D6)', () => {
      expect(ex.D6).toBeInstanceOf(ex.Die)
      expect(ex.D6.sides).toEqual(6)
    })

    it('returns a D with eight sides (D8)', () => {
      expect(ex.D8).toBeInstanceOf(ex.Die)
      expect(ex.D8.sides).toEqual(8)
    })

    it('returns a D with ten sides (D10)', () => {
      expect(ex.D10).toBeInstanceOf(ex.Die)
      expect(ex.D10.sides).toEqual(10)
    })

    it('returns a D with twelve sides (D12)', () => {
      expect(ex.D12).toBeInstanceOf(ex.Die)
      expect(ex.D12.sides).toEqual(12)
    })

    it('returns a D with twelve sides (D20)', () => {
      expect(ex.D20).toBeInstanceOf(ex.Die)
      expect(ex.D20.sides).toEqual(20)
    })

    it('returns a D with twelve sides (D100)', () => {
      expect(ex.D100).toBeInstanceOf(ex.Die)
      expect(ex.D100.sides).toEqual(100)
    })
  })
})

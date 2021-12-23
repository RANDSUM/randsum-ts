import { isDiceNotation } from './isDiceNotation'

describe('isDiceNotation', () => {
  describe('when not given dice notation', () => {
    describe('such as a numbered string', () => {
      const notNotation = '4'
      test('it returns false', () => {
        expect(isDiceNotation(notNotation)).toBe(false)
      })
    })
    describe('such as a wordy string', () => {
      const notNotation = '4'
      test('it returns false', () => {
        expect(isDiceNotation(notNotation)).toBe(false)
      })
    })
    describe('such as a number', () => {
      const notNotation = 4
      test('it returns false', () => {
        expect(isDiceNotation(notNotation)).toBe(false)
      })
    })
    describe('such as an array', () => {
      const notNotation = [1, 2, 3]
      test('it returns false', () => {
        expect(isDiceNotation(notNotation)).toBe(false)
      })
    })
    describe('such as an object', () => {
      const notNotation = { foo: 'bar' }
      test('it returns false', () => {
        expect(isDiceNotation(notNotation)).toBe(false)
      })
    })
    describe('such as the very concept of truth', () => {
      const notNotation = true
      test('it returns false', () => {
        expect(isDiceNotation(notNotation)).toBe(false)
      })
    })
    describe('such as the very concept of deception', () => {
      const notNotation = false
      test('it returns false', () => {
        expect(isDiceNotation(notNotation)).toBe(false)
      })
    })
    describe('such as undefined', () => {
      const notNotation = undefined
      test('it returns false', () => {
        expect(isDiceNotation(notNotation)).toBe(false)
      })
    })
  })
  describe('given valid Dice Notation', () => {
    describe('be it simple', () => {
      const simple = '2d20'
      test('returns true', () => {
        expect(isDiceNotation(simple)).toBe(true)
      })
    })
    describe('be it complex', () => {
      const complex = '2d20V{<2,>2}!L2U'
      test('returns true', () => {
        expect(isDiceNotation(complex)).toBe(true)
      })
    })
  })
})

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
      test('returns true', () => {
        expect(isDiceNotation('2d20')).toBe(true)
      })
    })

    describe('be it complex', () => {
      test('returns true', () => {
        expect(isDiceNotation('2d20V{<2,>2}!L2U')).toBe(true)
      })
    })
  })
})

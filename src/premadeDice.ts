import type { CustomD } from './CustomD'
import { D } from './D'
import type { NumericalD } from './NumericalD'

export const D4: NumericalD = D(4)
export const D6: NumericalD = D(6)
export const D8: NumericalD = D(8)
export const D10: NumericalD = D(10)
export const D12: NumericalD = D(12)
export const D20: NumericalD = D(20)
export const D100: NumericalD = D(100)

export const Coin: CustomD = D(['Heads', 'Tails'])
export const FudgeDice: CustomD = D(['+', '+', '+', '-', ' ', ' '])

const generateAlphaNumericFaces = (): string[] => {
  const lowercase = Array.from(
    { length: 26 },
    (_, i) => String.fromCharCode(97 + i) // a-z
  )
  const uppercase = Array.from(
    { length: 26 },
    (_, i) => String.fromCharCode(65 + i) // A-Z
  )
  const numbers = Array.from(
    { length: 10 },
    (_, i) => String(i) // 0-9
  )

  return [...lowercase, ...uppercase, ...numbers]
}

export const AlphaNumDie: CustomD = D(generateAlphaNumericFaces())

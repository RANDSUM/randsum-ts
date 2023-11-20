export type DiceNotationWithNumericSides = `${number}${
  | 'd'
  | 'D'}${number}${string}`
export type DiceNotationWithCustomSides = `${number}${'d' | 'D'}{${string}}`

export type DiceNotation<D extends string | number = number> = D extends number
  ? DiceNotationWithNumericSides
  : DiceNotationWithCustomSides

export type InclusiveOrNumber = 'inclusive' | number
export type NumberString<N extends InclusiveOrNumber = 'inclusive'> =
  N extends 'inclusive' ? number | `${number}` : number

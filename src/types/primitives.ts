export type DieSides = string | number

type DiceNotationWithNumericSides = `${number}${'d' | 'D'}${number}${string}`
type DiceNotationWithCustomSides = `${number}${'d' | 'D'}{${string}}`

export type DiceNotation<T extends DieSides = number> = T extends number
  ? DiceNotationWithNumericSides
  : DiceNotationWithCustomSides

type TypeAndStringType<
  T extends string | number | bigint | boolean | null | undefined
> = T | `${T}`

export type NumberString<N extends number | 'inclusive' = 'inclusive'> =
  N extends 'inclusive' ? TypeAndStringType<number> : number

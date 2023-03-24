export type DieSides = string | number

type DiceNotationWithNumericSides = `${number}${'d' | 'D'}${number}${string}`
type CustomDiceSidesNotation = `{${string}}`
type DiceNotationWithCustomSides = `${number}${
  | 'd'
  | 'D'}${CustomDiceSidesNotation}`

export type DiceNotation<T extends DieSides = number> = T extends number
  ? DiceNotationWithNumericSides
  : DiceNotationWithCustomSides

export type NumberStringArgument = number | 'inclusive'

export type NumberString<T extends NumberStringArgument = 'inclusive'> =
  T extends 'inclusive' ? number | `${number}` : number

export type TypeOrArrayOfType<T> = T | T[]

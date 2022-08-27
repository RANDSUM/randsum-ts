export type StandardDie = 'standard'
export type CustomSidesDie = 'customSides'
export type DieType = StandardDie | CustomSidesDie

export type DiceNotationWithNumericSides = `${number}${
  | 'd'
  | 'D'}${number}${string}`

export type CustomDiceSidesNotation = `{${string}}`
export type DiceNotationWithCustomSides = `${number}${
  | 'd'
  | 'D'}${CustomDiceSidesNotation}`

export type DiceNotation<N extends DieType = StandardDie> =
  N extends StandardDie
    ? DiceNotationWithNumericSides
    : DiceNotationWithCustomSides

export type NumberStringArgument = number | 'inclusive'

export type TypeOrArrayOfType<T> = T | T[]

export type NumberString<T extends NumberStringArgument = 'inclusive'> =
  T extends 'inclusive' ? number | `${number}` : number

export type Randomizer = (sides: number) => number

export type CustomSides = Array<number | string>

export type Detailed = true
export type Simple = false
export type DetailedType = Detailed | Simple | never

export type StandardDie = 'standard'
export type CustomSidesDie = 'customSides'
export type DieType = StandardDie | CustomSidesDie

type DiceNotationWithNumericSides = `${number}${'d' | 'D'}${number}${string}`
type CustomDiceSidesNotation = `{${string}}`
type DiceNotationWithCustomSides = `${number}${
  | 'd'
  | 'D'}${CustomDiceSidesNotation}`

export type DiceNotation<N extends DieType = DieType> = N extends StandardDie
  ? DiceNotationWithNumericSides
  : DiceNotationWithCustomSides

export type NumberStringArgument = number | 'inclusive'

export type NumberString<T extends NumberStringArgument = 'inclusive'> =
  T extends 'inclusive' ? number | `${number}` : number

export type CustomSides = Array<number | string>

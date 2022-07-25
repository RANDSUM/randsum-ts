/**
  * `DiceNotation` is a [Template Literal](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
 patterned ater the basic dice notation (with room for extensions).
  * See [Randsum Dice Notation](https://github.com/alxjrvs/randsum/blob/main/RANDSUM_DICE_NOTATION.md) for more.
  */
export type DiceNotation = `${number}${'d' | 'D'}${number}${string}`

/**
  * NumberString leverages [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) to simplify our interfaces.
  * When `Numberstring<'inclusive'>`, NumberString resolves to `number | ${number}` (a number or number-like string)
  *
  * When `NumberString<number>`, NumberString resolves to `number`.
  *
  * This allows us to use `RollOptions<number>` as the base for RollParameters, while
  still benefitting from strong types.
  */
export type NumberString<T extends number | 'inclusive' = 'inclusive'> = T extends 'inclusive'
  ? number | `${number}`
  : number

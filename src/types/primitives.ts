export type DiceNotation = `${number}${'d' | 'D'}${number}${string}`

export type NumberStringArgument = number | 'inclusive'

export type TypeOrArrayOfType<T> = T | T[]

export type NumberString<T extends NumberStringArgument = 'inclusive'> =
  T extends 'inclusive' ? number | `${number}` : number

export type Randomizer = (sides: number) => number

export type Detailed = boolean | undefined

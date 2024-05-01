export type DiceNotationWithNumericSides = `${number}${
  | 'd'
  | 'D'}${number}${string}`
export type DiceNotationWithCustomSides = `${number}${'d' | 'D'}{${string}}`

export type DiceNotation<D = string | number> = D extends number
  ? DiceNotationWithNumericSides
  : DiceNotationWithCustomSides

export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property]
}

export enum DicePoolType {
  standard = 'standard',
  custom = 'custom',
  mixed = 'mixed'
}

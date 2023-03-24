import { NumberString } from './types/primitives'

// eslint-disable-next-line import/prefer-default-export
export const generateStandardSides = (sides: NumberString): number[] =>
  Array.from({ length: Number(sides) }, (_, index) => index + 1)

import { CustomSides } from '../types/options'

// eslint-disable-next-line import/prefer-default-export
export const isCustomSides = (sides: unknown): sides is CustomSides =>
  Array.isArray(sides)

import { CustomSides } from '../types/options'

export const isCustomSides = (sides: unknown): sides is CustomSides =>
  Array.isArray(sides)

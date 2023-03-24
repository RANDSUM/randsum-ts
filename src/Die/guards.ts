// eslint-disable-next-line import/prefer-default-export
export const isCustomSides = (sides: unknown): sides is (number | string)[] =>
  Array.isArray(sides)

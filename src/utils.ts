// eslint-disable-next-line import/prefer-default-export
export const generateStandardSides = (sides: number): number[] =>
  Array.from({ length: sides }, (_, index) => index + 1)

// eslint-disable-next-line import/prefer-default-export
export const generateNumFaces = (sides: number): number[] =>
  // eslint-disable-next-line unicorn/new-for-builtins
  [...Array(sides).keys()].map((i) => i + 1)

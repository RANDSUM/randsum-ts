/* eslint-disable import/prefer-default-export */

export function makeRolls(quantity: number, rollOne: () => number): number[] {
  return Array.from({ length: quantity }, rollOne)
}

/* eslint-enable import/prefer-default-export */

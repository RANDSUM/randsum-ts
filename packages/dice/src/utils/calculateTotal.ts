export function calculateTotal(
  rolls: (string | number)[],
  bonus: string | number = 0
): string | number {
  if (rolls.every((roll) => typeof roll === 'number')) {
    return rolls.reduce((acc, cur) => (acc as number) + (cur as number), bonus)
  }

  return rolls.flat().join(', ')
}

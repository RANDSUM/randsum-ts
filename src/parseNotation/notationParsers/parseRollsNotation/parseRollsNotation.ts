export function parseRollsNotation(modifierString: string) {
  return Number(modifierString.split('d')[0])
}

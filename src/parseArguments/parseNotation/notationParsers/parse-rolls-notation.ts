export function parseRollsNotation(notationString: string) {
  return Number(notationString.split('d')[0])
}

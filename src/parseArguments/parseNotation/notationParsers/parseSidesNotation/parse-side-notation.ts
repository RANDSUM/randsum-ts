export function parseSideNotation(notationString: string) {
  return Number(notationString.split('d')[1])
}

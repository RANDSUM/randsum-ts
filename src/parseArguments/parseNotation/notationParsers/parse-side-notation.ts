export function parseSideNotation(notationString: string) {
  return { sides: Number(notationString.split('d')[1]) }
}

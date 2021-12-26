export function parsePlusNotation(notationString: string) {
  return { plus: Number(notationString.split('+')[1]) }
}

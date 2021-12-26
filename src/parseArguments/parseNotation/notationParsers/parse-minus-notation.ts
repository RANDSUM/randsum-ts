export function parseMinusNotation(notationString: string) {
  return { minus: Number(notationString.split('-')[1]) }
}

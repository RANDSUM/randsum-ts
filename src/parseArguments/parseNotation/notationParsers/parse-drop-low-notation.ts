export function parseDropLowNotation(notationString: string) {
  return { lowest: Number(notationString.split('l')[1]) || 1 }
}

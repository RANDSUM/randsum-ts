export function parseDropLowNotation(notationString: string) {
  const lowest = Number(notationString.split('l')[1]) || 1

  return { lowest }
}

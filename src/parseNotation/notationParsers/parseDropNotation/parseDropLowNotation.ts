export function parseDropLowNotation(modifierString: string) {
  const lowest = Number(modifierString.split('l')[1]) || 1

  return { lowest }
}

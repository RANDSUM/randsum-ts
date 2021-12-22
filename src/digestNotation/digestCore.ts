export function digestCore(coreNotationString: string) {
  const [rolls, sides] = coreNotationString.split('d').map(Number)

  return {
    rolls,
    sides,
  }
}

export function digestCore(notationString: string) {
  const [rolls, sides] = notationString.split('d').map(Number)

  return {
    rolls,
    sides,
  }
}

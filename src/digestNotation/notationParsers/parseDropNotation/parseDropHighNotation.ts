export function parseDropHighNotation(modifierString: string) {
  const highest = Number(modifierString.split('h')[1]) || 1
  return { highest }
}

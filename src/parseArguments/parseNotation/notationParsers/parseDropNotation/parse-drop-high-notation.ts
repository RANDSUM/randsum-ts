export function parseDropHighNotation(notationString: string) {
  const highest = Number(notationString.split('h')[1]) || 1
  return { highest }
}

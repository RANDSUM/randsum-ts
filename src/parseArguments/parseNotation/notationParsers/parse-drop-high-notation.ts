export function parseDropHighNotation(notationString: string) {
  return { highest: Number(notationString.split('h')[1]) || 1 }
}

export function parseCoreSides(notationString: string): number | string[] {
  if (notationString.includes('{')) {
    return [...notationString.replaceAll(/{|}/g, '')]
  }
  return Number(notationString)
}

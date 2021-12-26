export function parseRollsNotation(notationString: string) {
  return { rolls: Number(notationString.split('d')[0]) }
}

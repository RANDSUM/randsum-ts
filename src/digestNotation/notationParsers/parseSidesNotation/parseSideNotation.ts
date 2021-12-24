export function parseSideNotation(modifierString: string) {
  return Number(modifierString.split('d')[1])
}

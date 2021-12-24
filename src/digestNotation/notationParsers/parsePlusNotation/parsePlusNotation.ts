export function parsePlusNotation(modifierString: string) {
  return Number(modifierString.split('+')[1])
}

export function isCustomSides(sides: unknown): sides is string[] {
  return Array.isArray(sides) && sides.every(side => typeof side === 'string')
}
export function isNumeric(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value)
}
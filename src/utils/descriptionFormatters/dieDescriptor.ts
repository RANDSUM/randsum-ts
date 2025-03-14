export function dieDescriptor(quantity = 1): string {
  if (quantity > 1) return 'dice'
  return 'die'
}

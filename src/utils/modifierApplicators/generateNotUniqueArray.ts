import type { UniqueOptions } from '~types'

export function generateNotUniqueArray(
  unique: boolean | UniqueOptions | undefined
): number[] {
  if (unique === undefined || typeof unique === 'boolean') {
    return []
  }
  return unique.notUnique.map(Number)
}

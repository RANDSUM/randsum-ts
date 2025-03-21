import type { UniqueOptions } from '~types'

export function generateNotUniqueArray(
  unique: boolean | UniqueOptions | undefined | null
): number[] {
  if (unique === undefined || typeof unique === 'boolean' || unique === null) {
    return []
  }
  return unique.notUnique.map(Number)
}

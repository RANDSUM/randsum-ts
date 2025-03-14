import type { UniqueOptions } from '~types'

export function uniqueNotation(unique: boolean | UniqueOptions): string {
  if (typeof unique === 'boolean') return 'U'
  return `U{${unique.notUnique.join(',')}}`
}

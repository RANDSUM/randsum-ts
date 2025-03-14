import type { UniqueOptions } from '~types'
import { formatHumanList } from './formatHumanList'

export function uniqueString(unique: boolean | UniqueOptions): string {
  if (typeof unique === 'boolean') return 'No Duplicate Rolls'
  return `No Duplicates (except ${formatHumanList(unique.notUnique)})`
}

import { Match } from '../types'
import { completeRollPattern } from '../utils'

export function findMatches(notations: string): Match {
  let m
  const match: Match = { coreNotationMatch: '1d20' }
  while ((m = completeRollPattern.exec(notations)) !== null) {
    if (m.groups !== undefined) {
      for (const key of Object.keys(m.groups)) {
        if (m.groups[key] !== undefined) {
          match[key] = m.groups[key]
        }
      }
    }
  }
  return match
}

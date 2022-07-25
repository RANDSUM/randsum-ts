import { Match } from '../types'
import { completeRollPattern } from './patterns'

export function findMatches(notations: string): Match[] {
  let m
  let matches: Match[] = []
  while ((m = completeRollPattern.exec(notations)) !== null) {
    if (m.groups !== null && m.groups !== undefined) {
      for (const key of Object.keys(m.groups)) {
        if (m.groups[key] !== undefined) {
          matches = [...matches, { [key]: m.groups[key] }]
        }
      }
    }
  }
  return matches
}

import { allPatterns } from 'patterns'

export type Match =
  | { coreNotationMatch: string }
  | { dropHighMatch?: string }
  | { dropLowMatch?: string }
  | { dropConstraintsMatch?: string }
  | { explodeMatch?: string }
  | { uniqueMatch?: string }
  | { replaceMatch?: string }
  | { rerollMatch?: string }
  | { capMatch?: string }
  | { plusMatch?: string }
  | { minusMatch?: string }

export const completeRollPattern = new RegExp(
  `${allPatterns.map((pattern) => pattern.source).join('|')}`,
  'g'
)

export function findMatches(notations: string): Match[] {
  let m
  let matches: Match[] = []
  while ((m = completeRollPattern.exec(notations)) !== null) {
    if (m.groups !== null && m.groups !== undefined) {
      for (const key of Object.keys(m.groups)) {
        if (m.groups[key] !== undefined) {
          const value = m.groups[key]
          matches = [
            ...matches,
            {
              [key]:
                key === 'coreNotationMatch'
                  ? value
                  : value.toLowerCase().replace(' ', '')
            }
          ]
        }
      }
    }
  }
  return matches
}

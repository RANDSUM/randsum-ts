import { allPatterns } from 'patterns'
import { Match, Randomizer } from 'types'

export const completeRollPattern = new RegExp(
  `${allPatterns.map((pattern) => pattern.source).join('|')}`,
  'g'
)

export function walkNotations(notations: string, matches: Match[]): Match[] {
  const m = completeRollPattern.exec(notations)
  if (m !== null && m.groups !== null && m.groups !== undefined) {
    let newMatches = matches
    const { groups } = m

    Object.keys(groups).forEach((key) => {
      if (groups[key] !== undefined) {
        const value = groups[key]
        newMatches = [
          ...matches,
          {
            [key]:
              key === 'coreNotationMatch'
                ? value
                : value.toLowerCase().replace(/s+/, '')
          }
        ]
      }
    })
    return walkNotations(notations, newMatches)
  }
  return matches
}

export function findMatches(notations: string): Match[] {
  return walkNotations(notations, [])
}

export function makeRolls(quantity: number, rollOne: () => number): number[] {
  const rolls: number[] = Array.from({ length: quantity })
  for (let index = 0; index < quantity; index += 1) {
    rolls[index] = rollOne()
  }
  return rolls
}

export function defaultRandomizer(max: number): number {
  return Math.floor(Math.random() * Number(max)) + 1
}

export function rollOneFactory(sides: number, randomizer: Randomizer) {
  return function rollOne() {
    return randomizer(sides)
  }
}

import { cap } from 'digestNotation/matchers'

export function parseCapNotation(modifierString: string) {
  const match = modifierString.match(cap)

  if (!match) {
    return undefined
  }

  return match[0]
    .toLowerCase()
    .split('c')[1]
    .split(/(?!\d)/)
    .reduce((total, note) => {
      switch (true) {
        case note.includes('<'):
          return { ...total, below: Number(note.replace('<', '')) }
        case note.includes('>'):
          return { ...total, above: Number(note.replace('>', '')) }
        default:
          return total
      }
    }, {})
}

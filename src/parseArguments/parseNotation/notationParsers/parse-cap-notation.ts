import { CapModifier } from 'types'

export function parseCapNotation(notationString: string): CapModifier<number> {
  let capParameters = {}
  const capString = notationString.split('c')[1].split(/(?!\d)/)
  for (const note of capString) {
    if (note.includes('<')) {
      capParameters = {
        ...capParameters,
        lessThan: Number(note.replace('<', ''))
      }
      continue
    }
    capParameters = {
      ...capParameters,
      greaterThan: Number(note.replace('>', ''))
    }
  }
  return { cap: capParameters }
}

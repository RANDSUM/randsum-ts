import { RollParameters } from '../../../types'

export function parseCapNotation(notationString: string): Pick<RollParameters, 'cap'> {
  let capParameters = {}
  const capString = notationString.split('c')[1].split(/(?!\d)/)
  for (const note of capString) {
    if (note.includes('<')) {
      capParameters = { ...capParameters, below: Number(note.replace('<', '')) }
      continue
    }
    capParameters = { ...capParameters, above: Number(note.replace('>', '')) }
  }
  return { cap: capParameters }
}

export function parseCapNotation(notationString: string) {
  let capParameters = {}
  const capString = notationString.split('c')[1].split(/(?!\d)/)
  for (const note of capString) {
    if (note.includes('<')) {
      capParameters = { ...capParameters, below: Number(note.replace(/</g, '')) }
      continue
    }
    capParameters = { ...capParameters, above: Number(note.replace(/>/g, '')) }
  }
  return capParameters
}

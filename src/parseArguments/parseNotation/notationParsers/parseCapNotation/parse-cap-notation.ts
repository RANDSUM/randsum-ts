export function parseCapNotation(notationString: string) {
  let capParameters = {}
  const capString = notationString.split('c')[1].split(/(?!\d)/)
  for (const note of capString) {
    if (note.includes('<')) {
      capParameters = { ...capParameters, below: Number(note.replaceAll('<', '')) }
      continue
    }
    capParameters = { ...capParameters, above: Number(note.replaceAll('>', '')) }
  }
  return capParameters
}

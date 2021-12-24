export function parseCapNotation(notationString: string) {
  const capString = notationString.split('c')[1].split(/(?!\d)/)
  return capString.reduce((total, note) => {
    switch (true) {
      case note.includes('<'):
        return { ...total, below: Number(note.replace(/</g, '')) }
      default:
        return { ...total, above: Number(note.replace(/>/g, '')) }
    }
  }, {})
}

export function parseCapNotation(modifierString: string) {
  const capString = modifierString.split('c')[1].split(/(?!\d)/)
  return capString.reduce((total, note) => {
    switch (true) {
      case note.includes('<'):
        return { ...total, below: Number(note.replace('<', '')) }
      default:
        return { ...total, above: Number(note.replace('>', '')) }
    }
  }, {})
}

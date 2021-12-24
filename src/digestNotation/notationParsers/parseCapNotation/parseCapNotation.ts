export function parseCapNotation(modifierString: string) {
  return modifierString
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

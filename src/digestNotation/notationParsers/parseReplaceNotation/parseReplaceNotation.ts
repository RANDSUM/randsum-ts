export function parseReplaceNotation(modifierString: string) {
  const replaceOpts = modifierString
    .split('v')[1]
    .replace('{', '')
    .replace('}', '')
    .split(',')
    .map(replacement => {
      const [noteFrom, noteTo] = replacement.split('=')

      const baseReplacement = { to: Number(noteTo) }
      switch (true) {
        case noteFrom.includes('>'):
          return { ...baseReplacement, from: { above: Number(noteFrom.replace('>', '')) } }
        case noteFrom.includes('<'):
          return { ...baseReplacement, from: { below: Number(noteFrom.replace('<', '')) } }
        default:
          return { ...baseReplacement, from: Number(noteFrom) }
      }
    })

  return replaceOpts.length === 1 ? replaceOpts[0] : replaceOpts
}

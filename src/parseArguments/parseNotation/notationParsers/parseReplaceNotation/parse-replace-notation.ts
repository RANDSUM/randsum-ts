export function parseReplaceNotation(notationString: string) {
  const replaceOptions = notationString
    .split('v')[1]
    .replace(/{/g, '')
    .replace(/}/g, '')
    .split(',')
    .map(replacement => {
      const [noteFrom, noteTo] = replacement.split('=')

      const baseReplacement = { to: Number(noteTo) }
      switch (true) {
        case noteFrom.includes('>'):
          return { ...baseReplacement, from: { above: Number(noteFrom.replace(/>/g, '')) } }
        case noteFrom.includes('<'):
          return { ...baseReplacement, from: { below: Number(noteFrom.replace(/</g, '')) } }
        default:
          return { ...baseReplacement, from: Number(noteFrom) }
      }
    })

  return replaceOptions.length === 1 ? replaceOptions[0] : replaceOptions
}

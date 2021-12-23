import { replace } from 'digestNotation/matchers'

export function parseReplaceNotation(modifierString: string) {
  const match = modifierString.match(replace)

  if (!match) {
    return undefined
  }

  const replaceOpts = match[0]
    .toLowerCase()
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

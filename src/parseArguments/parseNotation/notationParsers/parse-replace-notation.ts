import { RollParameters } from '../../../types'

export function parseReplaceNotation(notationString: string): Pick<RollParameters, 'replace'> {
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
          return { ...baseReplacement, from: { greaterThan: Number(noteFrom.replace('>', '')) } }
        case noteFrom.includes('<'):
          return { ...baseReplacement, from: { lessThan: Number(noteFrom.replace('<', '')) } }
        default:
          return { ...baseReplacement, from: Number(noteFrom) }
      }
    })

  return { replace: replaceOptions.length === 1 ? replaceOptions[0] : replaceOptions }
}

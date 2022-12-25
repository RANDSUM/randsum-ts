import { ReplaceMatch, ReplaceModifier } from 'types'

export default function parseReplaceNotation({
  replaceMatch: notationString
}: ReplaceMatch): ReplaceModifier<number> {
  const replaceOptions = notationString
    .split(/[Vv]/)[1]
    .replace(/{/g, '')
    .replace(/}/g, '')
    .split(',')
    .map((replacement) => {
      const [noteFrom, noteTo] = replacement.split('=')

      const baseReplacement = { to: Number(noteTo) }
      if (noteFrom.includes('>')) {
        return {
          ...baseReplacement,
          from: { greaterThan: Number(noteFrom.replace(/>/g, '')) }
        }
      }
      if (noteFrom.includes('<')) {
        return {
          ...baseReplacement,
          from: { lessThan: Number(noteFrom.replace(/</g, '')) }
        }
      }
      return { ...baseReplacement, from: Number(noteFrom) }
    })

  return {
    replace: replaceOptions.length === 1 ? replaceOptions[0] : replaceOptions
  }
}

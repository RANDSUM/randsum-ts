import { CapMatch, CapModifier } from 'types'

export default function parseCapNotation({
  capMatch: notationString
}: CapMatch): CapModifier<number> {
  let capParameters = {}
  const capString = notationString.split('c')[1].split(/(?!\d)/)
  capString.forEach((note) => {
    if (note.includes('<')) {
      capParameters = {
        ...capParameters,
        lessThan: Number(note.replace(/</g, ''))
      }
      return
    }
    capParameters = {
      ...capParameters,
      greaterThan: Number(note.replace(/>/g, ''))
    }
  })
  return { cap: capParameters }
}

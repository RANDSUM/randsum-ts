import {
  CapModifier,
  DropModifier,
  DropOptions,
  InternalRollParameters,
  ReplaceModifier,
  RerollModifier,
  RerollOptions,
  UniqueModifier
} from 'types'

function parseCoreNotationCustomSides(
  sides: string
): Pick<InternalRollParameters, 'sides' | 'faces'> {
  const faces = sides.replace(/{|}/g, '').split('')
  return {
    faces,
    sides: faces.length
  }
}

export function parseCoreNotation(
  notationString: string
): Pick<InternalRollParameters, 'sides' | 'quantity' | 'faces'> {
  const [quantity, sides] = notationString.split(/[dD]/)

  return {
    quantity: Number(quantity),
    ...(sides.includes('{')
      ? parseCoreNotationCustomSides(sides)
      : { sides: Number(sides), faces: undefined })
  }
}

export function parseCapNotation(notationString: string): CapModifier<number> {
  let capParameters = {}
  const capString = notationString.split('c')[1].split(/(?!\d)/)
  for (const note of capString) {
    if (note.includes('<')) {
      capParameters = {
        ...capParameters,
        lessThan: Number(note.replace('<', ''))
      }
      continue
    }
    capParameters = {
      ...capParameters,
      greaterThan: Number(note.replace('>', ''))
    }
  }
  return { cap: capParameters }
}

export function parseDropConstraintsNotation(
  notationString: string
): DropModifier<number> {
  let dropConstraintParameters: Pick<
    DropOptions<number>,
    'exact' | 'greaterThan' | 'lessThan'
  > = { exact: [] }
  const constraints = notationString
    .split('d')[1]
    .replace(/{/g, '')
    .replace(/}/g, '')
    .split(',')
  for (const constraint of constraints) {
    if (constraint.includes('<')) {
      dropConstraintParameters = {
        ...dropConstraintParameters,
        lessThan: Number(constraint.split('<')[1])
      }
      continue
    }
    if (constraint.includes('>')) {
      dropConstraintParameters = {
        ...dropConstraintParameters,
        greaterThan: Number(constraint.split('>')[1])
      }
      continue
    }
    dropConstraintParameters = {
      ...dropConstraintParameters,

      exact: [...(dropConstraintParameters?.exact || []), Number(constraint)]
    }
  }
  return { drop: dropConstraintParameters }
}

export function parseDropHighNotation(
  notationString: string
): DropModifier<number> {
  const highestCount = notationString.split('h')[1]

  return {
    drop: { highest: highestCount !== '' ? Number(highestCount) : 1 }
  }
}

export function parseDropLowNotation(
  notationString: string
): DropModifier<number> {
  const lowestCount = notationString.split('l')[1]

  return {
    drop: {
      lowest: lowestCount !== '' ? Number(lowestCount) : 1
    }
  }
}

export function parseReplaceNotation(
  notationString: string
): ReplaceModifier<number> {
  const replaceOptions = notationString
    .split('v')[1]
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

export function parseRerollNotation(
  notationString: string
): RerollModifier<number> {
  const parsedString = notationString
    .split('r')[1]
    .replace(/{/g, '')
    .replace(/}/g, ',!')
    .split(',')
  let rerollParameters: RerollOptions<number> = {}
  for (const notation of parsedString) {
    if (notation === '!') {
      continue
    }
    if (notation.includes('<')) {
      rerollParameters = {
        ...rerollParameters,
        lessThan: Number(notation.split('<')[1])
      }
      continue
    }
    if (notation.includes('>')) {
      rerollParameters = {
        ...rerollParameters,
        greaterThan: Number(notation.split('>')[1])
      }
      continue
    }
    if (notation.includes('!')) {
      rerollParameters = {
        ...rerollParameters,
        maxReroll: Number(notation.split('!')[1])
      }
      continue
    }
    rerollParameters = {
      ...rerollParameters,
      exact: [
        ...(Array.isArray(rerollParameters?.exact)
          ? rerollParameters.exact
          : ([] as number[])),
        Number(notation)
      ]
    }
  }

  return { reroll: rerollParameters }
}

export function parseUniqueNotation(
  notationString: string
): UniqueModifier<number> {
  if (notationString === 'u') {
    return { unique: true }
  }

  const notUnique = notationString
    .replace(/u{/g, '')
    .replace(/}/g, '')
    .split(',')

  return {
    unique: {
      notUnique: notUnique.map(Number)
    }
  }
}

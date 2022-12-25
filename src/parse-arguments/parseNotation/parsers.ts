import {
  CapMatch,
  CapModifier,
  CoreNotationMatch,
  DropConstraintsMatch,
  DropHighMatch,
  DropLowMatch,
  DropModifier,
  DropOptions,
  ExplodeMatch,
  ExplodeModifier,
  InternalRollParameters,
  Match,
  MinusMatch,
  MinusModifier,
  Modifier,
  PlusMatch,
  PlusModifier,
  ReplaceMatch,
  ReplaceModifier,
  RerollMatch,
  RerollModifier,
  RerollOptions,
  UniqueMatch,
  UniqueModifier
} from 'types'
import {
  isCapMatch,
  isDropConstraintsMatch,
  isDropHighMatch,
  isDropLowMatch,
  isExplodeMatch,
  isMinusMatch,
  isPlusMatch,
  isReplaceMatch,
  isRerollMatch,
  isUniqueMatch
} from 'utils'

function parseCoreNotationCustomSides(
  sides: string
): Pick<InternalRollParameters, 'sides' | 'faces'> {
  const faces = [...sides.replace(/{|}/g, '')]
  return {
    faces,
    sides: faces.length
  }
}

export function parseCoreNotation({
  coreNotationMatch: notationString
}: CoreNotationMatch): Pick<
  InternalRollParameters,
  'sides' | 'quantity' | 'faces'
> {
  const [quantity, sides] = notationString.split(/[Dd]/)

  return {
    quantity: Number(quantity),
    ...(sides.includes('{')
      ? parseCoreNotationCustomSides(sides)
      : { sides: Number(sides), faces: undefined })
  }
}

function parseCapNotation({
  capMatch: notationString
}: CapMatch): CapModifier<number> {
  let capParameters = {}
  const capString = notationString.split(/[Cc]/)[1].split(/(?!\d)/)
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

function parseUniqueNotation({
  uniqueMatch: notationString
}: UniqueMatch): UniqueModifier<number> {
  if (notationString === 'u' || notationString === 'U') {
    return { unique: true }
  }

  const notUnique = notationString
    .replace(/[Uu]{/g, '')
    .replace(/}/g, '')
    .split(',')

  return {
    unique: {
      notUnique: notUnique.map(Number)
    }
  }
}

function parseDropConstraintsNotation({
  dropConstraintsMatch: notationString
}: DropConstraintsMatch): DropModifier<number> {
  let dropConstraintParameters: Pick<
    DropOptions<number>,
    'exact' | 'greaterThan' | 'lessThan'
  > = { exact: [] }
  const constraints = notationString
    .split(/[Dd]/)[1]
    .replace(/{/g, '')
    .replace(/}/g, '')
    .split(',')
  constraints.forEach((constraint) => {
    if (constraint.includes('<')) {
      dropConstraintParameters = {
        ...dropConstraintParameters,
        lessThan: Number(constraint.split('<')[1])
      }
      return
    }
    if (constraint.includes('>')) {
      dropConstraintParameters = {
        ...dropConstraintParameters,
        greaterThan: Number(constraint.split('>')[1])
      }
      return
    }
    dropConstraintParameters = {
      ...dropConstraintParameters,

      exact: [...(dropConstraintParameters?.exact || []), Number(constraint)]
    }
  })
  return { drop: dropConstraintParameters }
}

function parseDropHighNotation({
  dropHighMatch: notationString
}: DropHighMatch): DropModifier<number> {
  const highestCount = notationString.split(/[Hh]/)[1]

  return {
    drop: { highest: highestCount === '' ? 1 : Number(highestCount) }
  }
}

function parseDropLowNotation({
  dropLowMatch: notationString
}: DropLowMatch): DropModifier<number> {
  const lowestCount = notationString.split(/[Ll]/)[1]

  return {
    drop: {
      lowest: lowestCount === '' ? 1 : Number(lowestCount)
    }
  }
}

function parseRerollNotation({
  rerollMatch: notationString
}: RerollMatch): RerollModifier<number> {
  const parsedString = notationString
    .split(/[Rr]/)[1]
    .replace(/{/g, '')
    .replace(/}/g, ',!')
    .split(',')
  let rerollParameters: RerollOptions<number> = {}
  parsedString.forEach((notation) => {
    if (notation === '!') {
      return
    }
    if (notation.includes('<')) {
      rerollParameters = {
        ...rerollParameters,
        lessThan: Number(notation.split('<')[1])
      }
      return
    }
    if (notation.includes('>')) {
      rerollParameters = {
        ...rerollParameters,
        greaterThan: Number(notation.split('>')[1])
      }
      return
    }
    if (notation.includes('!')) {
      rerollParameters = {
        ...rerollParameters,
        maxReroll: Number(notation.split('!')[1])
      }
      return
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
  })

  return { reroll: rerollParameters }
}

function parseExplodeNotation({
  explodeMatch: notationString
}: ExplodeMatch): ExplodeModifier {
  return { explode: Boolean(notationString) }
}

function parseMinusNotation({
  minusMatch: notationString
}: MinusMatch): MinusModifier<number> {
  return { minus: Number(notationString.split('-')[1]) }
}

function parsePlusNotation({
  plusMatch: notationString
}: PlusMatch): PlusModifier<number> {
  return { plus: Number(notationString.split('+')[1]) }
}

function parseReplaceNotation({
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

export default function parseModifiers(match: Match): Modifier<number> {
  if (isDropHighMatch(match)) {
    return parseDropHighNotation(match)
  }
  if (isDropLowMatch(match)) {
    return parseDropLowNotation(match)
  }
  if (isDropConstraintsMatch(match)) {
    return parseDropConstraintsNotation(match)
  }
  if (isExplodeMatch(match)) {
    return parseExplodeNotation(match)
  }
  if (isUniqueMatch(match)) {
    return parseUniqueNotation(match)
  }
  if (isReplaceMatch(match)) {
    return parseReplaceNotation(match)
  }
  if (isRerollMatch(match)) {
    return parseRerollNotation(match)
  }
  if (isCapMatch(match)) {
    return parseCapNotation(match)
  }
  if (isPlusMatch(match)) {
    return parsePlusNotation(match)
  }
  if (isMinusMatch(match)) {
    return parseMinusNotation(match)
  }
  throw new Error('Unrecognized Match')
}

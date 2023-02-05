import { RollParameters } from '../types'
import {
  CapModifier,
  DropModifier,
  DropOptions,
  ExplodeModifier,
  MinusModifier,
  Modifier,
  PlusModifier,
  ReplaceModifier,
  RerollModifier,
  RerollOptions,
  UniqueModifier
} from './types'

const isMatcherType = <T extends Match>(
  argument: Match,
  key: keyof T
): argument is T => (argument as T)[key] !== undefined

export type CoreNotationMatch = { coreNotationMatch: string }
export const isCoreNotationMatch = (match: Match): match is CoreNotationMatch =>
  isMatcherType<CoreNotationMatch>(match, 'coreNotationMatch')

export type DropHighMatch = { dropHighMatch: string }
export const isDropHighMatch = (match: Match): match is DropHighMatch =>
  isMatcherType<DropHighMatch>(match, 'dropHighMatch')

export type DropLowMatch = { dropLowMatch: string }
export const isDropLowMatch = (match: Match): match is DropLowMatch =>
  isMatcherType<DropLowMatch>(match, 'dropLowMatch')

export type DropConstraintsMatch = { dropConstraintsMatch: string }
export const isDropConstraintsMatch = (
  match: Match
): match is DropConstraintsMatch =>
  isMatcherType<DropConstraintsMatch>(match, 'dropConstraintsMatch')

export type ExplodeMatch = { explodeMatch: string }
export const isExplodeMatch = (match: Match): match is ExplodeMatch =>
  isMatcherType<ExplodeMatch>(match, 'explodeMatch')

export type UniqueMatch = { uniqueMatch: string }
export const isUniqueMatch = (match: Match): match is UniqueMatch =>
  isMatcherType<UniqueMatch>(match, 'uniqueMatch')

export type ReplaceMatch = { replaceMatch: string }
export const isReplaceMatch = (match: Match): match is ReplaceMatch =>
  isMatcherType<ReplaceMatch>(match, 'replaceMatch')

export type RerollMatch = { rerollMatch: string }
export const isRerollMatch = (match: Match): match is RerollMatch =>
  isMatcherType<RerollMatch>(match, 'rerollMatch')

export type CapMatch = { capMatch: string }
export const isCapMatch = (match: Match): match is CapMatch =>
  isMatcherType<CapMatch>(match, 'capMatch')

export type PlusMatch = { plusMatch: string }
export const isPlusMatch = (match: Match): match is PlusMatch =>
  isMatcherType<PlusMatch>(match, 'plusMatch')

export type MinusMatch = { minusMatch: string }
export type Match =
  | CoreNotationMatch
  | DropHighMatch
  | DropLowMatch
  | DropConstraintsMatch
  | ExplodeMatch
  | UniqueMatch
  | ReplaceMatch
  | RerollMatch
  | CapMatch
  | PlusMatch
  | MinusMatch

const parseCoreNotationCustomSides = (
  sides: string
): Pick<RollParameters, 'sides' | 'faces'> => {
  const faces = [...sides.replace(/{|}/g, '')]
  return {
    faces,
    sides: faces.length
  }
}

export const parseCoreNotation = ({
  coreNotationMatch: notationString
}: CoreNotationMatch): Pick<RollParameters, 'sides' | 'quantity' | 'faces'> => {
  const [quantity, sides] = notationString.split(/[Dd]/)

  return {
    quantity: Number(quantity),
    ...(sides.includes('{')
      ? parseCoreNotationCustomSides(sides)
      : { sides: Number(sides), faces: undefined })
  }
}

const parseCapNotation = ({
  capMatch: notationString
}: CapMatch): CapModifier<number> => {
  let capParameters = {}
  const capString = notationString.split(/[Cc]/)[1].split(/(?!\d)/)
  capString.forEach((note) => {
    capParameters = note.includes('<')
      ? {
          ...capParameters,
          lessThan: Number(note.replace(/</g, ''))
        }
      : {
          ...capParameters,
          greaterThan: Number(note.replace(/>/g, ''))
        }
  })
  return { cap: capParameters }
}

const parseUniqueNotation = ({
  uniqueMatch: notationString
}: UniqueMatch): UniqueModifier<number> => {
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

const parseDropConstraintsNotation = ({
  dropConstraintsMatch: notationString
}: DropConstraintsMatch): DropModifier<number> => {
  let dropConstraintParameters: Pick<
    DropOptions<number>,
    'greaterThan' | 'lessThan'
  > & { exact: number[] } = { exact: [] }
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
      exact: [...dropConstraintParameters.exact, Number(constraint)]
    }
  })
  return { drop: dropConstraintParameters }
}

const parseDropHighNotation = ({
  dropHighMatch: notationString
}: DropHighMatch): DropModifier<number> => {
  const highestCount = notationString.split(/[Hh]/)[1]

  return {
    drop: { highest: highestCount === '' ? 1 : Number(highestCount) }
  }
}

const parseDropLowNotation = ({
  dropLowMatch: notationString
}: DropLowMatch): DropModifier<number> => {
  const lowestCount = notationString.split(/[Ll]/)[1]

  return {
    drop: {
      lowest: lowestCount === '' ? 1 : Number(lowestCount)
    }
  }
}

const parseRerollNotation = ({
  rerollMatch: notationString
}: RerollMatch): RerollModifier<number> => {
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

const parseExplodeNotation = ({
  explodeMatch: notationString
}: ExplodeMatch): ExplodeModifier => ({ explode: Boolean(notationString) })

const parseMinusNotation = ({
  minusMatch: notationString
}: MinusMatch): MinusModifier<number> => ({
  minus: Number(notationString.split('-')[1])
})

const parsePlusNotation = ({
  plusMatch: notationString
}: PlusMatch): PlusModifier<number> => ({
  plus: Number(notationString.split('+')[1])
})

const parseReplaceNotation = ({
  replaceMatch: notationString
}: ReplaceMatch): ReplaceModifier<number> => {
  const replaceOptions = notationString
    .split(/[Vv]/)[1]
    .replace(/{/g, '')
    .replace(/}/g, '')
    .split(',')
    .map((replacement) => {
      const [noteFrom, noteTo] = replacement.split('=')

      const coreReplacement = { to: Number(noteTo) }
      if (noteFrom.includes('>')) {
        return {
          ...coreReplacement,
          from: { greaterThan: Number(noteFrom.replace(/>/g, '')) }
        }
      }
      if (noteFrom.includes('<')) {
        return {
          ...coreReplacement,
          from: { lessThan: Number(noteFrom.replace(/</g, '')) }
        }
      }
      return { ...coreReplacement, from: Number(noteFrom) }
    })

  return {
    replace: replaceOptions.length === 1 ? replaceOptions[0] : replaceOptions
  }
}

const parseModifiers = (
  match: Exclude<Match, CoreNotationMatch>
): Modifier<number> => {
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
  return parseMinusNotation(match)
}

export default parseModifiers

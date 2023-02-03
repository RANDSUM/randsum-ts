import { DiceNotation } from '../types'

export const coreNotationPattern = /(?<coreNotationMatch>^\d+[Dd](\d+|{.*}))/

const isDiceNotation = (argument: unknown): argument is DiceNotation =>
  !!coreNotationPattern.test(String(argument))

export default isDiceNotation

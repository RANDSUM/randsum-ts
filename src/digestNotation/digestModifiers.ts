import {
  parseDropNotation,
  parsePlusNotation,
  parseMinusNotation,
  parseCapNotation,
  parseReplaceNotation,
  parseUniqeNotation,
  parseExplodeNotation,
  parseRerollNotation,
} from './notationParsers'

export function digestModifiers(modifierString: string) {
  return [
    { drop: parseDropNotation(modifierString) },
    { plus: parsePlusNotation(modifierString) },
    { minus: parseMinusNotation(modifierString) },
    { cap: parseCapNotation(modifierString) },
    { replace: parseReplaceNotation(modifierString) },
    { reroll: parseRerollNotation(modifierString) },
    { explode: parseExplodeNotation(modifierString) },
    { unique: parseUniqeNotation(modifierString) },
  ].reduce((parameters, current) => {
    if (Object.values(current).every(val => val != {} || !!val)) {
      return { ...parameters, ...current }
    }
    return parameters
  }, {})
}

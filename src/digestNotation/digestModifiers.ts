import {
  parseDropNotation,
  parsePlusNotation,
  parseMinusNotation,
  parseCapNotation,
  parseReplaceNotation,
} from './notationParsers'

export function digestModifiers(modifierString: string) {
  return [
    { drop: parseDropNotation(modifierString) },
    { plus: parsePlusNotation(modifierString) },
    { minus: parseMinusNotation(modifierString) },
    { cap: parseCapNotation(modifierString) },
    { replace: parseReplaceNotation(modifierString) },
    { reroll: undefined },
    { explode: undefined },
    { unique: undefined },
  ].reduce((parameters, current) => {
    if (Object.values(current).every(val => val != {} || !!val)) {
      return { ...parameters, ...current }
    }
    return parameters
  }, {})
}

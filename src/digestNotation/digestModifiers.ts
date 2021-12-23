import { parseDropNotation, parsePlusNotation, parseMinusNotation, parseCapNotation } from './notationParsers'

export function digestModifiers(modifierString: string) {
  return [
    { drop: parseDropNotation(modifierString) },
    { plus: parsePlusNotation(modifierString) },
    { minus: parseMinusNotation(modifierString) },
    { cap: parseCapNotation(modifierString) },
    { replace: undefined },
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
